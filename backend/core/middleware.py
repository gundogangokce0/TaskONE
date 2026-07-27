import logging
from rest_framework_simplejwt.authentication import JWTAuthentication

logger = logging.getLogger(__name__)


class APICSRFExemptMiddleware:
    """Disables CSRF checks for API requests and adds CORS headers."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api/'):
            setattr(request, '_dont_enforce_csrf_checks', True)

        if request.method == "OPTIONS" and request.path.startswith('/api/'):
            from django.http import HttpResponse
            response = HttpResponse()
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            return response

        response = self.get_response(request)

        if request.path.startswith('/api/'):
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"

        return response


class JWTAuthenticationMiddleware:
    """Authenticates users via JWT Token for API requests."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if hasattr(request, 'user') and not request.user.is_authenticated:
            try:
                jwt_auth = JWTAuthentication()
                header = jwt_auth.get_header(request)
                if header is not None:
                    raw_token = jwt_auth.get_raw_token(header)
                    if raw_token is not None:
                        validated_token = jwt_auth.get_validated_token(raw_token)
                        request.user = jwt_auth.get_user(validated_token)
            except Exception:
                pass
        return self.get_response(request)


class APILoggingMiddleware:
    """Logs API requests to the console."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api/'):
            print(f"[API LOG] {request.method} {request.path}")
        return self.get_response(request)


class DisableCSRFMiddleware(APICSRFExemptMiddleware):
    pass
