# Arquitectura y Configuración de Git/GitHub en esta PC (Windows)

Este documento resume cómo Git y GitHub están configurados en este sistema Windows, explicando el manejo de credenciales y por qué no es necesario introducir usuario/contraseña o tokens para cada `commit` o `push`.

## 1. Cuenta de GitHub Asociada

*   **Usuario de GitHub:** `progxefero666`
*   **Correo Electrónico Asociado:** `correoxefero@gmail.com`

## 2. Gestión de Credenciales en Windows

En Windows, Git puede integrarse con el **Administrador de Credenciales de Windows** (o con herramientas auxiliares como el **Git Credential Manager Core** que se instala junto con Git para Windows).

**Funcionamiento:**

1.  **Primer Acceso:** La primera vez que te conectas a un repositorio remoto de GitHub (por ejemplo, al hacer `git clone`, `git pull`, o `git push`) que requiere autenticación, Git te solicitará tus credenciales (usuario/contraseña o, preferiblemente, un Personal Access Token - PAT).
2.  **Almacenamiento Seguro:** Una vez que proporcionas estas credenciales, el Administrador de Credenciales de Git las almacena de forma segura en el Administrador de Credenciales de Windows.
3.  **Autenticación Automática:** En las siguientes operaciones de Git con repositorios remotos (en GitHub u otros servicios), Git consultará automáticamente al Administrador de Credenciales. Si encuentra credenciales válidas para el servicio, las utilizará sin que tengas que volver a escribirlas.

**¿Por qué no se solicitan claves en cada commit?**

*   Los `commit` son operaciones locales. Se realizan en tu repositorio local y no interactúan directamente con el servidor remoto (GitHub) hasta que ejecutas un comando como `git push`.
*   La autenticación es necesaria para operaciones que interactúan con el *repositorio remoto*, como `git push` (subir cambios), `git pull` (bajar cambios), `git fetch` (bajar información de cambios), o `git clone` (clonar un repositorio).
*   Gracias al Administrador de Credenciales, una vez que te has autenticado correctamente la primera vez contra un host (como `github.com`), las credenciales se reutilizan para las siguientes operaciones remotas, evitando la necesidad de introducirlas repetidamente.

## 3. Personal Access Tokens (PAT) - Recomendado

Aunque el sistema puede funcionar con usuario/contraseña, GitHub recomienda usar **Personal Access Tokens (PATs)** en lugar de tu contraseña para mayor seguridad, especialmente si tienes la autenticación de dos factores (2FA) habilitada. Un PAT es una cadena alfanumérica que actúa como una contraseña delegada con permisos específicos.

*   Si en algún momento el Administrador de Credenciales deja de funcionar o necesitas reautenticarte, considera generar un PAT en GitHub y usarlo cuando Git te pida la contraseña.

## 4. Verificación de Configuración

Puedes verificar la configuración de tu auxiliar de credenciales con el comando:
```bash
git config --global credential.helper
```
El resultado suele ser `manager-core` o similar si estás usando el Git Credential Manager.

## Resumen para Futuras Sesiones

*   **Git debería gestionar tus credenciales automáticamente** a través del Administrador de Credenciales de Windows.
*   No deberías necesitar introducir tu usuario/contraseña o token para cada `push` o `pull` después de la primera autenticación exitosa.
*   Si se te solicitan credenciales inesperadamente, verifica el estado del Administrador de Credenciales o considera usar/renovar un Personal Access Token desde tu cuenta de GitHub.
*   La cuenta principal configurada es `progxefero666`. 