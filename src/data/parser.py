import re
import json

def parse_js_to_json(js_file, json_file):
    with open(js_file, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # 去掉前缀，比如 const e=
    js_content = re.sub(r'^\s*const\s+\w+\s*=\s*', '', js_content)

    # 补全末尾缺失的 ] 和 ;
    js_content = js_content.strip()
    if not js_content.endswith(']'):
        js_content += ']'

    # 将未加引号的 key 改为 "key"
    js_content = re.sub(r'([{,])(\s*)(\w+)\s*:', r'\1"\3":', js_content)

    try:
        # 转换为 Python 对象
        data = json.loads(js_content)

        # 写入 JSON 文件
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"成功导出为 {json_file}")

    # except json.JSONDecodeError as e:
    #     print("解析失败:", e)

if __name__ == "__main__":
    parse_js_to_json('songs_raw.js', 'songs.json')
