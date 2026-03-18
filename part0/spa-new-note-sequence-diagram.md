```mermaid
sequenceDiagram
    participant browser
    participant server

    activate browser

    note right of browser:Get data from form when submit button pressed

    note right of browser:Create new note

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>server: Store new note
    deactivate server

    deactivate browser
```
