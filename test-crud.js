const { Usuario, Tablero, Lista, Tarjeta } = require('./models');

const runTest = async () => {
  try {
    console.log('--- Iniciando Pruebas CRUD (HT-03) ---');

    // 1. CREATE: Crear una nueva Tarjeta y asociarla a una Lista existente
    console.log('\n1. CREATE:');
    const lista = await Lista.findOne({ where: { titulo: 'Por hacer' } });
    if (!lista) throw new Error('Lista no encontrada para la prueba');

    const nuevaTarjeta = await Tarjeta.create({
      titulo: 'Nueva Tarea de Prueba',
      contenido: 'Esta tarjeta fue creada mediante test-crud.js',
      listaId: lista.id
    });
    console.log(`✅ Tarjeta creada con éxito: "${nuevaTarjeta.titulo}"`);

    // 2. READ: Leer un Tablero incluyendo sus Listas y Tarjetas asociadas
    console.log('\n2. READ:');
    const tablero = await Tablero.findOne({
      where: { titulo: 'Dashboard Principal' },
      include: [
        {
          model: Lista,
          as: 'listas',
          include: [{ model: Tarjeta, as: 'tarjetas' }]
        }
      ]
    });

    if (tablero) {
      console.log(`✅ Tablero encontrado: "${tablero.titulo}"`);
      console.log(`   Número de listas: ${tablero.listas.length}`);
      tablero.listas.forEach(l => {
        console.log(`   - Lista: "${l.titulo}" (${l.tarjetas.length} tarjetas)`);
      });
    }

    // 3. UPDATE: Modificar el título de una Tarjeta o Lista
    console.log('\n3. UPDATE:');
    await nuevaTarjeta.update({ titulo: 'Tarea de Prueba Actualizada' });
    console.log(`✅ Título de tarjeta actualizado a: "${nuevaTarjeta.titulo}"`);

    // 4. DELETE: Eliminar una Tarjeta o Lista
    console.log('\n4. DELETE:');
    const idAEliminar = nuevaTarjeta.id;
    await nuevaTarjeta.destroy();
    const verificacion = await Tarjeta.findByPk(idAEliminar);
    
    if (!verificacion) {
      console.log('✅ Tarjeta eliminada con éxito');
    } else {
      console.log('❌ Falló la eliminación de la tarjeta');
    }

    console.log('\n--- Pruebas CRUD finalizadas con éxito ---');
    process.exit(0);
  } catch (error) {
    console.error('Error durante las pruebas CRUD:', error);
    process.exit(1);
  }
};

runTest();
