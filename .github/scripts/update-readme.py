#!/usr/bin/env python3

import os
import yaml
import re


def parse_yaml(file_path):
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)
    return data


def generate_markdown_table(data, key):
    markdown = f"\n### {key.capitalize()}\n\n"
    required_lines = []
    optional_lines = []

    if 'inputs' in key:
        markdown += "| Name | Description | Required | Default |\n"
        markdown += "|:-----|:------------|:---------|:--------|\n"
    else:
        markdown += "| Name | Description |\n"
        markdown += "|:-----|:------------|\n"

    line_length = 0
    for item in sorted(data.get(key, {}).items()):
        name = item[0]
        description = item[1].get('description', '')
        required = item[1].get('required', '')
        default = item[1].get('default', '')
        if 'inputs' in key:
            line = f"| {name} | {description} | {str(required).lower()} | {default} |"
            if len(line) > line_length:
                line_length = len(line)
            # dividing required and optional
            if required:
                required_lines.append(line)
            else:
                optional_lines.append(line)
        else:
            markdown += f"| {name} | {description} |\n"

    # joining required and optional
    markdown += '\n'.join(required_lines + optional_lines)
    return markdown


def create_readme(yaml_file, md_file):
#     with open(os.path.join('..', '..', 'src', 'index.ts'), 'r') as typescript:
#         index_ts = typescript.read()
#
#     inputs_variables = re.findall(r"^(.*)(core\.getInput\(')(\w+)('.*)$", index_ts, re.VERBOSE | re.MULTILINE)
#     print(inputs_variables)
#
#     outputs_variables = re.findall(r"^(.*)(core\.setOutput\(')(\w+)('.*)$", index_ts, re.VERBOSE | re.MULTILINE)
#     print(outputs_variables)

    data = parse_yaml(yaml_file)
    inputs_table = generate_markdown_table(data, 'inputs')
    outputs_table = generate_markdown_table(data, 'outputs')

    with open(md_file, 'w') as file:
        file.write("## GitHub Actions Usage\n")
        file.write(inputs_table + '\n')
        file.write(outputs_table)


if __name__ == '__main__':
    create_readme('action.yaml', 'GITHUB_ACTIONS.md')
