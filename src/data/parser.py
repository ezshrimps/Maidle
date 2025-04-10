import re
import json

def parse_js_to_json(js_file, json_file):
    with open(js_file, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # Delete front const e=
    js_content = re.sub(r'^\s*const\s+\w+\s*=\s*', '', js_content)

    # Make sure ends with ]
    js_content = js_content.strip()
    if not js_content.endswith(']'):
        js_content += ']'

    js_content = re.sub(r'([{,])(\s*)(\w+)\s*:', r'\1"\3":', js_content)

    try:
        data = json.loads(js_content)

        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"Succesfully export {json_file}")

    except json.JSONDecodeError as e:
        print("Failed Parsing:", e)

if __name__ == "__main__":
    parse_js_to_json('songs_raw.js', 'songs.json')
