# 💼 EF-M7 Proyecto integrador Sprint 2

## Instrucciones de uso

### Instalación
Para instalar las dependencias necesarias, ejecuta el siguiente comando en la terminal:
```bash
pnpm install
```

### Configuración de entorno
1. Localiza el archivo `.env` en la raíz del proyecto.
2. Asegúrate de completar la variable `DB_PASSWORD` con la contraseña de tu base de datos de Supabase.
3. El archivo ya contiene los demás parámetros de conexión pre-configurados.

### Ejecución
Este proyecto incluye dos scripts principales para interactuar con la base de datos:

1. **Poblar la base de datos:** Sincroniza los modelos y crea datos de ejemplo.
   ```bash
   node seed.js
   ```

2. **Probar operaciones CRUD:** Verifica que las operaciones de creación, lectura, actualización y borrado funcionen correctamente.
   ```bash
   node test-crud.js
   ```

### Ejemplos de uso
Al ejecutar `node test-crud.js`, verás una salida en consola detallando cada operación, por ejemplo:
- `✅ Tarjeta creada con éxito: "Nueva Tarea de Prueba"`
- `✅ Tablero encontrado: "Dashboard Principal"`
- `✅ Título de tarjeta actualizado a: "Tarea de Prueba Actualizada"`
- `✅ Tarjeta eliminada con éxito`

---

## Proyecto: "KanbanPro" - Kick-off del Sprint 2
**Asunto:** 📧 ¡Prototipo aprobado! Iniciando Fase 2: Arquitectura de Datos  
**De:** David, Product Manager de KanbanPro  
**Para:** El Equipo de Desarrollo (Tú)

¡Hola equipo!

Excelentes noticias: a los stakeholders les encantó el prototipo visual del Sprint 1. La navegación es clara y el diseño del dashboard es exactamente lo que buscábamos. ¡Buen trabajo!

Ahora es el momento de pasar a la siguiente fase. Con el diseño validado, tenemos luz verde para construir la capa de persistencia. En este sprint, nos centraremos exclusivamente en la base de datos. Necesitamos definir cómo se estructurará, almacenará y relacionará toda la información de nuestros usuarios y sus proyectos.

Este es un paso crítico y fundamental para el éxito de KanbanPro. Por ahora, no se preocupen por conectar esto a la interfaz web; el objetivo es crear un modelo de datos sólido y probarlo de forma aislada para garantizar su integridad.

¡A construir la base de nuestro proyecto!

Saludos, David

---

## Resumen del Sprint 2: Modelo de Datos y Capa de Persistencia

**Objetivo del Sprint:**  
Crear la arquitectura completa de la base de datos utilizando PostgreSQL y el ORM Sequelize. El entregable será un conjunto de modelos de datos funcionales y scripts para crear, poblar y probar la base de datos, garantizando que la lógica de negocio esté correctamente representada. La interfaz web visible no sufrirá cambios y seguirá mostrando datos simulados.

## Historias Técnicas a Implementar

### HT-01: Definición de la Arquitectura de Datos con ORM
Como desarrollador, necesito definir los modelos y sus relaciones usando Sequelize, para que la aplicación tenga una forma estructurada y predecible de manejar los datos de Usuarios, Tableros, Listas y Tarjetas.

**Criterios de Aceptación:**
- [x] Se deben instalar las dependencias `sequelize`, `pg` y `pg-hstore`.
- [x] Se debe configurar y verificar una conexión exitosa a la base de datos PostgreSQL.
- [x] Deben existir los archivos de modelo para **Usuario**, **Tablero**, **Lista** y **Tarjeta** en una carpeta `/models`.
- [x] Se deben establecer correctamente las relaciones "uno a muchos" (`hasMany` / `belongsTo`) entre los modelos:
  - Usuario ↔ Tablero
  - Tablero ↔ Lista
  - Lista ↔ Tarjeta

### HT-02: Creación y Poblado Automatizado de la Base de Datos
Como desarrollador, necesito un script que cree el esquema de la base de datos y la pueble con datos de prueba, para disponer de un entorno de desarrollo consistente y poder probar la lógica con datos realistas.

**Criterios de Aceptación:**
- [x] El método `sequelize.sync()` debe ser utilizado para crear las tablas en la base de datos a partir de los modelos.
- [x] Debe existir un script separado (ej: `seed.js`) que, al ejecutarse (`node seed.js`), popule las tablas con datos de ejemplo (al menos 2 usuarios, 3 tableros y varias listas/tarjetas).

### HT-03: Verificación de la Lógica del Modelo de Datos
Como desarrollador, necesito scripts de prueba para realizar operaciones CRUD directamente en la base de datos, para asegurar la integridad del modelo y sus relaciones antes de exponerlos a través de una API.

**Criterios de Aceptación:**
- [x] Debe existir un script separado (ej: `test-crud.js`).
- [x] Este script, al ejecutarse, debe demostrar de forma aislada (sin usar Express) al menos una operación de cada tipo:
  - **Crear:** Crear una nueva Tarjeta y asociarla a una Lista existente.
  - **Leer:** Leer un Tablero incluyendo sus Listas y Tarjetas asociadas (usando `include`).
  - **Actualizar:** Modificar el título de una Tarjeta o Lista.
  - **Borrar:** Eliminar una Tarjeta o Lista.
- [x] La salida en la consola del script debe verificar que las operaciones se completaron con éxito.

## Requisitos Técnicos
- **Base de Datos:** PostgreSQL.
- **ORM:** Sequelize.
- **Enfoque:** La lógica de este sprint se desarrolla en scripts ejecutados por Node.js, no a través de rutas de un servidor web. La aplicación web del Sprint 1 no se modifica en su funcionalidad.

## Entregable
- Un repositorio público en GitHub con el proyecto actualizado.
- El repositorio debe incluir la nueva carpeta `/models` y los nuevos scripts (`seed.js`, `test-crud.js`).
- Se debe verificar que la aplicación web sigue funcionando como en el Sprint 1 (con sus datos simulados), demostrando el desacoplamiento.

