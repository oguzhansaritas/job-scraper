"""
DEPRECATED: This file is replaced by the new modular backend structure.
Please use: python backend/src/main.py

This file is kept for backward compatibility only.
The new backend follows SOLID principles with proper separation of concerns.
"""

import sys
import os
import warnings

def main():
    """Legacy entry point - redirects to new structure"""
    warnings.warn(
        "local_api_server.py is deprecated. Use 'python backend/src/main.py' instead.",
        DeprecationWarning,
        stacklevel=2
    )
    
    print("⚠️  DEPRECATED: local_api_server.py")
    print("📦 Use the new modular backend instead:")
    print("   cd backend")
    print("   python src/main.py")
    print()
    print("🔄 Redirecting to new backend...")
    
    # Add the new backend path
    backend_path = os.path.join(os.path.dirname(__file__), 'backend', 'src')
    if backend_path not in sys.path:
        sys.path.insert(0, backend_path)
    
    try:
        from main import main as new_main
        new_main()
    except ImportError as e:
        print(f"❌ Error importing new backend: {e}")
        print("💡 Make sure to install dependencies: pip install -r backend/requirements.txt")
        sys.exit(1)

if __name__ == '__main__':
    main()
