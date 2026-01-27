# logipret - Copilot Instructions

> **CRITICAL**: Before making ANY changes to business logic, database schema, or core features, you MUST read and follow the rules in this document.

## Source of Truth

All business logic is defined in PlantUML diagrams at:
`/documentation/schemas/plantuml/`

**ALWAYS check these diagrams before implementing features:**
- `00-business-rules.puml` - Master list of all rules with IDs
- `00-governance.puml` - Development process rules

---

## Governance Rules (MANDATORY)

### Process Rules
- **GOV-001**: Update PlantUML diagram BEFORE implementing code
- **GOV-002**: Every business rule must have a unique ID (e.g., SEC-001, PAY-002)
- **GOV-003**: PRs that change logic MUST include diagram updates

### Security Rules
- **SEC-001**: Users see only their own data (enforce via RLS)
- **SEC-002**: Admins see all data (enforce via RLS)
- **SEC-003**: `SUPABASE_SERVICE_ROLE_KEY` is server-only, NEVER expose to client

### Data Rules
- **DAT-001**: All data changes should be logged to audit table
- **DAT-002**: Use foreign keys for relationships
- **DAT-003**: Validate data at API layer AND database layer

---

## Database Migrations (MANDATORY)

> **RULE MIG-001**: ALL database changes MUST go through migration files. NEVER modify the database directly via Supabase Dashboard SQL Editor.

### Migration Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| MIG-001 | All DB changes = migration file | Code review |
| MIG-002 | Migrations in `supabase/migrations/` | Supabase CLI |
| MIG-003 | Timestamp format: `YYYYMMDDHHMMSS_name.sql` | CLI generates |
| MIG-004 | Test on branch before merging | Supabase branching |
| MIG-005 | Never edit already-applied migrations | Breaks history |

### Before ANY DB Changes

When user asks to modify the database, I MUST:

1. Ask: "This requires a database migration. Should I create `supabase/migrations/YYYYMMDDHHMMSS_description.sql`?"
2. Create the migration file (NEVER run SQL directly)
3. Remind user to test on a branch before merging
4. Update PlantUML diagrams if schema changes affect business logic

---

## Before Making Changes

1. **Check the relevant diagram** in `/documentation/schemas/plantuml/`
2. **Look for RULE: markers** in diagram notes
3. **If changing logic**: Update diagram FIRST, then code
4. **Never bypass rules** without explicit user approval AND diagram update

---

## Project Context

See `datamanip/startup.txt` for project-specific context, domain info, and requirements.

---

## File Editing Rules

- NEVER use terminal commands (cat, echo, heredoc) to create or modify files
- Always use proper file creation/editing tools
- Avoid emoticons except for necessary action indicators
