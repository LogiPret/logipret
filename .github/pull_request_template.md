## Description
<!-- What does this PR do? -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist

### Governance
- [ ] Checked PlantUML diagrams before coding
- [ ] Updated diagrams if logic changed (GOV-001)
- [ ] All new rules have unique IDs (GOV-002)

### Database
- [ ] No direct DB changes (used migrations) (MIG-001)
- [ ] Migration file included if schema changed
- [ ] Tested on preview branch (MIG-004)

### Security
- [ ] RLS policies updated if needed (SEC-001/002)
- [ ] No service role key exposed to client (SEC-003)

### Code Quality
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

## Related Issues
<!-- Closes #123 -->
