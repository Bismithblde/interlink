from supabase import create_client
from app.core.config import get_settings

settings = get_settings()

# Use service role key for backend operations (bypasses RLS)
supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SECRET_KEY  # Changed from SUPABASE_KEY to SUPABASE_SECRET_KEY
)

def get_supabase():
    return supabase