#!/bin/bash
# 더블클릭으로 실행하는 런처 (자동 생성)
cd "$(dirname "$0")" || exit 1
PORT=8000
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT+1)); done
echo "http://localhost:$PORT 에서 실행합니다 (종료: Ctrl+C)"
(sleep 1; open "http://localhost:$PORT/") &
python3 -m http.server $PORT

echo; echo "종료됨. 아무 키나 누르면 창을 닫습니다."; read -n 1 -s
