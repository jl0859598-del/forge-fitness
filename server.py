#!/usr/bin/env python3
"""炼 FORGE 本地服务：静态文件 + 拍照营养估算代理。

API Key 只从环境变量或同目录 .env 读取，不会发送到浏览器。
"""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def load_dotenv() -> None:
    path = ROOT / ".env"
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key:
            os.environ.setdefault(key, value)


load_dotenv()

API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()
MODEL = (
    os.environ.get("OPENAI_VISION_MODEL", "").strip()
    or os.environ.get("OPENAI_MODEL", "").strip()
    or "gpt-6-astra"
)
BASE_URL = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1").rstrip("/")
TIMEOUT = float(os.environ.get("OPENAI_TIMEOUT", "90"))
MOCK = os.environ.get("FORGE_MOCK_VISION", "").strip() in {"1", "true", "yes"}

FOOD_SCHEMA = {
    "type": "object",
    "properties": {
        "dish_name": {"type": "string"},
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "estimated_grams": {"type": "number"},
                    "gram_range_low": {"type": "number"},
                    "gram_range_high": {"type": "number"},
                    "kcal": {"type": "number"},
                    "protein_g": {"type": "number"},
                    "carbs_g": {"type": "number"},
                    "fat_g": {"type": "number"},
                    "confidence": {"type": "number"},
                    "assumptions": {"type": "string"},
                },
                "required": [
                    "name",
                    "estimated_grams",
                    "gram_range_low",
                    "gram_range_high",
                    "kcal",
                    "protein_g",
                    "carbs_g",
                    "fat_g",
                    "confidence",
                    "assumptions",
                ],
                "additionalProperties": False,
            },
        },
        "total": {
            "type": "object",
            "properties": {
                "kcal": {"type": "number"},
                "protein_g": {"type": "number"},
                "carbs_g": {"type": "number"},
                "fat_g": {"type": "number"},
                "kcal_low": {"type": "number"},
                "kcal_high": {"type": "number"},
                "confidence": {"type": "number"},
            },
            "required": [
                "kcal",
                "protein_g",
                "carbs_g",
                "fat_g",
                "kcal_low",
                "kcal_high",
                "confidence",
            ],
            "additionalProperties": False,
        },
        "portion_notes": {"type": "string"},
        "needs_user_confirmation": {"type": "boolean"},
    },
    "required": ["dish_name", "items", "total", "portion_notes", "needs_user_confirmation"],
    "additionalProperties": False,
}

MOCK_RESULT = {
    "dish_name": "鸡胸肉、米饭和西兰花（示例）",
    "items": [
        {
            "name": "鸡胸肉",
            "estimated_grams": 140,
            "gram_range_low": 110,
            "gram_range_high": 170,
            "kcal": 231,
            "protein_g": 43.4,
            "carbs_g": 0,
            "fat_g": 5.0,
            "confidence": 0.82,
            "assumptions": "按煎/煮鸡胸肉估算，表面油较少",
        },
        {
            "name": "熟米饭",
            "estimated_grams": 220,
            "gram_range_low": 180,
            "gram_range_high": 260,
            "kcal": 255,
            "protein_g": 5.7,
            "carbs_g": 57.0,
            "fat_g": 0.7,
            "confidence": 0.76,
            "assumptions": "按普通饭碗约八成满估算",
        },
        {
            "name": "西兰花",
            "estimated_grams": 120,
            "gram_range_low": 90,
            "gram_range_high": 150,
            "kcal": 41,
            "protein_g": 3.4,
            "carbs_g": 7.9,
            "fat_g": 0.5,
            "confidence": 0.8,
            "assumptions": "按水煮/清炒、少量油估算",
        },
    ],
    "total": {
        "kcal": 527,
        "protein_g": 52.5,
        "carbs_g": 64.9,
        "fat_g": 6.2,
        "kcal_low": 440,
        "kcal_high": 630,
        "confidence": 0.79,
    },
    "portion_notes": "示例数据：这是开发测试结果。真实识别会依据照片中的参照物、碗盘大小和可见油量调整。",
    "needs_user_confirmation": True,
}


def normalize_result(result: dict) -> dict:
    items = result.get("items")
    if not isinstance(items, list) or not items:
        raise ValueError("没有识别到食物")
    clean_items = []
    for item in items[:12]:
        grams = max(1.0, float(item.get("estimated_grams", 0) or 0))
        clean_items.append(
            {
                "name": str(item.get("name", "食物"))[:60],
                "estimated_grams": round(grams),
                "gram_range_low": round(max(1.0, float(item.get("gram_range_low", grams * 0.8) or grams * 0.8))),
                "gram_range_high": round(max(grams, float(item.get("gram_range_high", grams * 1.2) or grams * 1.2))),
                "kcal": round(max(0.0, float(item.get("kcal", 0) or 0))),
                "protein_g": round(max(0.0, float(item.get("protein_g", 0) or 0)) * 10) / 10,
                "carbs_g": round(max(0.0, float(item.get("carbs_g", 0) or 0)) * 10) / 10,
                "fat_g": round(max(0.0, float(item.get("fat_g", 0) or 0)) * 10) / 10,
                "confidence": min(1.0, max(0.0, float(item.get("confidence", 0.5) or 0.5))),
                "assumptions": str(item.get("assumptions", ""))[:240],
            }
        )
    totals = {
        "kcal": round(sum(i["kcal"] for i in clean_items)),
        "protein_g": round(sum(i["protein_g"] for i in clean_items) * 10) / 10,
        "carbs_g": round(sum(i["carbs_g"] for i in clean_items) * 10) / 10,
        "fat_g": round(sum(i["fat_g"] for i in clean_items) * 10) / 10,
    }
    supplied_total = result.get("total") or {}
    totals["kcal_low"] = round(totals["kcal"] * 0.82)
    totals["kcal_high"] = round(totals["kcal"] * 1.22)
    if supplied_total.get("kcal_low") and supplied_total.get("kcal_high"):
        lo = float(supplied_total["kcal_low"])
        hi = float(supplied_total["kcal_high"])
        if 0 < lo <= hi:
            totals["kcal_low"] = round(lo)
            totals["kcal_high"] = round(hi)
    confidences = [i["confidence"] for i in clean_items]
    totals["confidence"] = min(1.0, max(0.0, float(supplied_total.get("confidence", sum(confidences) / len(confidences)))))
    return {
        "dish_name": str(result.get("dish_name", "这一餐"))[:80],
        "items": clean_items,
        "total": totals,
        "portion_notes": str(result.get("portion_notes", ""))[:600],
        "needs_user_confirmation": True,
    }


def call_openai(image_data_url: str, note: str) -> dict:
    if MOCK:
        return normalize_result(MOCK_RESULT)
    if not API_KEY:
        raise RuntimeError("missing_api_key")

    user_text = (
        "请估算这张照片里所有可见食物的可食部分。优先识别中式餐具和常见家常菜。"
        "考虑烹饪油、酱汁、汤汁、勾芡和油炸；如果食物被遮挡、盘中有剩饭或无法判断重量，"
        "请给更宽的克数范围并降低置信度。不要添加照片中没有出现的食物。"
        "份量按可食用部分估算，kcal 为千卡，宏量为克，confidence 为 0–1。"
        f"\n用户补充：{note.strip() or '无'}"
    )
    payload = {
        "model": MODEL,
        "input": [
            {
                "role": "system",
                "content": "你是严谨的营养估算助手。只分析照片中可见的食物，不能凭空猜测；只返回结构化 JSON。",
            },
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": user_text},
                    {"type": "input_image", "image_url": image_data_url, "detail": "high"},
                ],
            },
        ],
        "text": {
            "format": {
                "type": "json_schema",
                "name": "food_photo_estimate",
                "strict": True,
                "schema": FOOD_SCHEMA,
            }
        },
        "max_output_tokens": 1400,
    }
    request = urllib.request.Request(
        f"{BASE_URL}/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
            body = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(detail)
            message = parsed.get("error", {}).get("message") or detail
        except Exception:
            message = detail
        raise RuntimeError(str(message)[:500]) from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"无法连接 OpenAI：{exc.reason}") from exc

    data = json.loads(body)
    text = data.get("output_text")
    if not text:
        for output in data.get("output", []):
            if output.get("type") != "message":
                continue
            for content in output.get("content", []):
                if content.get("type") == "output_text":
                    text = content.get("text")
                elif content.get("type") == "refusal":
                    raise RuntimeError(f"模型拒绝处理：{content.get('refusal', '')[:200]}")
            if text:
                break
    if not text:
        raise RuntimeError("模型没有返回结构化结果")
    return normalize_result(json.loads(text))


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".mjs": "text/javascript",
        ".wasm": "application/wasm",
        ".task": "application/octet-stream",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        if self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def json_response(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        clean_path = urllib.parse.urlparse(self.path).path
        if clean_path in {"/.env", "/server.py"} or clean_path.startswith("/.git") or clean_path.startswith("/__pycache__"):
            self.json_response(404, {"ok": False, "error": "not_found", "message": "资源不存在"})
            return
        if self.path == "/api/health":
            self.json_response(
                200,
                {
                    "ok": True,
                    "configured": bool(API_KEY) or MOCK,
                    "mock": MOCK,
                    "model": MODEL,
                },
            )
            return
        super().do_GET()

    def do_POST(self) -> None:
        if self.path != "/api/analyze":
            self.json_response(404, {"ok": False, "error": "not_found", "message": "接口不存在"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        if length <= 0 or length > 16 * 1024 * 1024:
            self.json_response(413, {"ok": False, "error": "too_large", "message": "照片过大，请压缩到 16MB 以内"})
            return
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            image = payload.get("image_data_url", "")
            note = str(payload.get("note", ""))[:300]
            if not isinstance(image, str) or not re.match(r"^data:image/(jpeg|png|webp);base64,", image):
                raise ValueError("图片格式不正确，请使用 JPEG、PNG 或 WebP")
            result = call_openai(image, note)
            self.json_response(200, {"ok": True, "model": MODEL, "result": result})
        except RuntimeError as exc:
            message = str(exc)
            if message == "missing_api_key":
                self.json_response(
                    503,
                    {
                        "ok": False,
                        "error": "missing_api_key",
                        "message": "未配置 OPENAI_API_KEY。请在 forge 目录创建 .env 后重启。",
                    },
                )
            else:
                self.json_response(502, {"ok": False, "error": "upstream_error", "message": message})
        except Exception as exc:
            self.json_response(400, {"ok": False, "error": "bad_request", "message": str(exc)[:300]})


def main() -> None:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", "8080"))
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print("")
    print("炼 FORGE 已启动")
    print(f"电脑打开: http://localhost:{port}")
    print(f"手机打开: http://<本机局域网IP>:{port}")
    status = "MOCK 模式" if MOCK else ("已配置" if API_KEY else "未配置")
    print(f"拍照识别: {status} · 模型 {MODEL}")
    if not API_KEY and not MOCK:
        print("启用拍照识别: 在本目录创建 .env，写入 OPENAI_API_KEY=sk-...，然后重启。")
    print("按 Ctrl+C 停止。")
    print("")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止")


if __name__ == "__main__":
    main()
