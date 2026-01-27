# Security Guide

## Architecture

### Row Level Security (RLS) - Supabase

All tables use RLS to control data access:

```sql
-- Users see only their own data (SEC-001)
CREATE POLICY "Users can view own data"
  ON tablename FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
```

### API Keys

```env
# SAFE - Client-side (RLS protects)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# DANGER - Server-only (bypasses RLS)
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

**NEVER expose `service_role` to client! (SEC-003)**

## Security Rules

| Rule ID | Description | Enforcement |
|---------|-------------|-------------|
| SEC-001 | Users see only their data | RLS policies |
| SEC-002 | Admins see all data | RLS policies |
| SEC-003 | service_role is server-only | Code review |
