# Alkemy-Node
Intento del Proyecto de Disney propuesto por alkemy

Documentacion en postman: https://web.postman.co/workspace/My-Workspace~5b6fcd2f-f5ab-4267-838d-36d49ea50200/documentation/18731710-28653305-abe2-46e5-8660-f5fc1611653b .

# Cómo usar la API:
- clonar el repositorio, correr npm init y luego npm install para tener todas las dependencias instaladas
- IMPORTANTE: establecer las variables de entorno en ".env" (se proporciona una plantilla de ejemplo vacía, ".env.example.txt")
- no es necesario ningún conocimiento sofisticado sobre bases de datos ya que utilizando docker y corriendo un docker-compose up se puede hacer uso pleno de postgres y pgadmin
- Una vez esté corriendo el contenedor se debe preparar la base de datos. para ello simplemente ejecutar en consola "npm run migration:run" y luego "npm run seed:run"
- Con los últimos 2 comandos ya se habrán creado y llenado las tablas necesarias para poder utilizar la API en su totalidad
- Para usar la api simplemente  ejecutar en consola un "npm run dev" y luego usar una aplicacion para hacer uso de la API, como Postman o Insomnia ppor ejemplo


# Aclaraciónes
- la base de datos usa los nombres como "primary key", en lugar de IDs, en todos los casos ya que en el modelado de la base de datos dada en el reto no se especificaba una columna de ID. (incluir IDs inconfundibles sería optimo).
- genres no tiene un endpoint, por lo que si se quiere agregar géneros además de los ya incluidos en el seeder, se tendrá que hacer de forma manual en la base de datos o modificando el archivo:  "/db/seeders/20220210184554-create-genres.js". 
- es importante guardar el token que se retorna al registrase ya que este es requerido para cualquier tipo de modificación de datos.(GEts se pueden hacer sin problema)
