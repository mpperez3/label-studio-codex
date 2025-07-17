"""This file and its contents are licensed under the Apache License 2.0. Please see the included NOTICE for copyright information and LICENSE for a copy of the license.
"""
import importlib.metadata
from pathlib import Path
import re

# Package name
package_name = 'label-studio'

# Package version
try:
    __version__ = importlib.metadata.metadata(package_name).get("version")
except importlib.metadata.PackageNotFoundError:
    # Fallback to version from local pyproject if package metadata is missing
    try:
        pyproject = Path(__file__).resolve().parent.parent / "pyproject.toml"
        text = pyproject.read_text()
        match = re.search(r"^version\s*=\s*['\"](.+?)['\"]", text, re.MULTILINE)
        __version__ = match.group(1) if match else "0.0.0"
    except Exception:
        __version__ = "0.0.0"

# pypi info
__latest_version__ = None
__current_version_is_outdated__ = False
__latest_version_upload_time__ = None
__latest_version_check_time__ = None
