# PlantUML Diagrams - Source of Truth

This folder contains the **authoritative** business logic definitions.

## Governance Rules

| Rule ID | Rule | Why |
|---------|------|-----|
| GOV-001 | Update diagram BEFORE code | Diagrams are source of truth |
| GOV-002 | Every rule needs unique ID | Traceability |
| GOV-003 | PR must include diagram if logic changes | Enforced in review |

## Key Files

| File | Purpose |
|------|---------|
| `00-business-rules.puml` | Master list of all rules with IDs |
| `00-governance.puml` | Process and workflow rules |

## Viewing Diagrams

- VS Code: Install "PlantUML" extension
- Online: [plantuml.com](https://www.plantuml.com/plantuml/uml/)
