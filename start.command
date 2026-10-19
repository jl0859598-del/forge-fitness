#!/bin/zsh
cd "$(dirname "$0")" || exit 1
PORT=8080
while lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done
IP=$(ipconfig getifaddr en0 2>/dev/null || ifconfig en0 2>/dev/null | awk '/inet /{print $2; exit}')
if [ -z "$IP" ]; then
  IFACE=$(route -n get default 2>/dev/null | awk '/interface:/{print $2; exit}')
  IP=$(ipconfig getifaddr "$IFACE" 2>/dev/null || echo "本机IP")
fi
echo ""
echo "炼 FORGE 已启动"
echo "电脑打开: http://localhost:$PORT"
echo "手机打开: http://$IP:$PORT"
echo ""
echo "手机和电脑需要连接同一个 Wi-Fi。"
echo "拍照识别需要在当前目录的 .env 中配置 OPENAI_API_KEY。"
echo "按 Ctrl+C 停止。"
echo ""
python3 server.py "$PORT"
