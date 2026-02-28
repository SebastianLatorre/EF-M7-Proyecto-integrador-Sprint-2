const { sequelize, Usuario, Tablero, Lista, Tarjeta } = require('./models');

const seed = async () => {
  try {
    // Sincronizamos la base de datos (HT-02)
    // Usamos force: true para limpiar la base de datos antes de poblarla
    console.log('--- Iniciando sincronización de la base de datos ---');
    await sequelize.sync({ force: true });
    console.log('¡Base de datos sincronizada con éxito!');

    // Creamos usuarios de ejemplo
    console.log('--- Poblando datos iniciales ---');
    const juan = await Usuario.create({ nombre: 'Juan Pérez', email: 'juan@example.com' });
    const maria = await Usuario.create({ nombre: 'Maria García', email: 'maria@example.com' });

    // Creamos tableros
    const tablero1 = await Tablero.create({ 
      titulo: 'Dashboard Principal', 
      descripcion: 'Gestión de tareas diarias',
      usuarioId: juan.id 
    });
    const tablero2 = await Tablero.create({ 
      titulo: 'Proyecto X', 
      descripcion: 'Lanzamiento de producto',
      usuarioId: juan.id 
    });
    const tablero3 = await Tablero.create({ 
      titulo: 'Estudios', 
      descripcion: 'Cursos y aprendizaje',
      usuarioId: maria.id 
    });

    // Creamos listas para el primer tablero
    const lista1 = await Lista.create({ titulo: 'Por hacer', orden: 1, tableroId: tablero1.id });
    const lista2 = await Lista.create({ titulo: 'En proceso', orden: 2, tableroId: tablero1.id });
    const lista3 = await Lista.create({ titulo: 'Hecho', orden: 3, tableroId: tablero1.id });

    // Creamos tarjetas
    await Tarjeta.create({ titulo: 'Completar Sprint 2', contenido: 'Terminar modelos y tests', listaId: lista1.id });
    await Tarjeta.create({ titulo: 'Revisión técnica', contenido: 'Revisar relaciones Sequelize', listaId: lista1.id });
    await Tarjeta.create({ titulo: 'Configurar DB', contenido: 'SSL y variables de entorno', listaId: lista3.id });

    console.log('¡Poblado de datos completado exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('Error durante el seed:', error);
    process.exit(1);
  }
};

seed();
