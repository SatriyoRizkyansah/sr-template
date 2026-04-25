Refactor all React TypeScript components to modern best practices:

- Convert all React components from arrow function with React.FC into function declarations using `export function`
- Do NOT use React.FC
- Move props typing directly into the function parameter
- If `children` is used, explicitly define it in the Props type as React.ReactNode
- Preserve all existing logic and JSX

Use `const` (arrow functions) ONLY for:

- helper functions
- small utility functions
- inline functions (e.g. event handlers, callbacks)
- closures

Do NOT convert helper or utility functions into function declarations

Keep the code clean, consistent, and aligned with modern React + TypeScript standards
Do not modify business logic, only refactor structure and typing
