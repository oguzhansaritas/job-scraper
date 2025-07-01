"""
DEPRECATED: This file is replaced by the new modular backend structure.
Please use: backend/src/lambda_adapter.py

This file is kept for backward compatibility only.
The new backend follows SOLID principles with proper separation of concerns.
"""

import sys
import os

# Add the new backend path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend', 'src'))

try:
    from lambda_adapter import lambda_handler as new_lambda_handler
    
    def lambda_handler(event, context):
        """Legacy Lambda handler - redirects to new structure"""
        return new_lambda_handler(event, context)
        
except ImportError:
    # Fallback to basic error response if new structure not available
    import json
    
    def lambda_handler(event, context):
        """Fallback Lambda handler when new structure is not available"""
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": "Backend structure not found. Please deploy with new modular backend."
            })
        }
