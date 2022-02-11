# Alkemy-Node
Intento del Proyecto de Disney propuesto por alkemy

Documentacion en postman: https://web.postman.co/workspace/My-Workspace~5b6fcd2f-f5ab-4267-838d-36d49ea50200/documentation/18731710-28653305-abe2-46e5-8660-f5fc1611653b .

#Cómo usar la API:
- clonar el repositorio, correr npm init y luego npm install para tener todas las dependencias instaladas
- IMPORTANTE: establecer las variables de entorno en ".env" (se proporciona una plantilla de ejemplo vacía, ".env.example.txt")
- no es necesario ningún conocimiento sofisticado sobre bases de datos ya que utilizando docker y corriendo un docker-compose up se puede hacer uso pleno de postgres y pgadmin
- Una vez esté corriendo el contenedor se debe preparar la base de datos. para ello simplemente ejecutar en consola "npm run migration:run" y luego "npm run seed:run"
- Con los últimos 2 comandos ya se habrán creado y llenado las tablas necesarias para poder utilizar la API en su totalidad
- Para usar la api simplemente  ejecutar en consola un "npm run dev" y luego usar una aplicacion para hacer uso de la API, como Postman o Insomnia ppor ejemplo
