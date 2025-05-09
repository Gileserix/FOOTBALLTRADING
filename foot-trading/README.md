# Ejercicio 1: Implementación de una Web del Tiempo con la API de AEMET

## Análisis

El objetivo de esta prueba es verificar la funcionalidad de consulta de provincia y visualización de datos climáticos actuales y pronosticados. Se realizarán pruebas con las provincias de Sevilla y Madrid para asegurar que se muestran correctamente la temperatura, el estado del clima (lluvioso, soleado, o nublado) y la velocidad del viento tanto actuales como pronosticados para las próximas 48 horas.

## Diseño

1. **Interfaz de Usuario**:
   - Un campo de entrada para filtrar por provincia.
   - Una sección para mostrar los datos climáticos actuales: temperatura, estado del clima y velocidad del viento.
   - Una sección para mostrar los datos climáticos pronosticados para las próximas 48 horas: temperatura, estado del clima y velocidad del viento.
   - Un selector para cambiar entre unidades de temperatura (Celsius y Fahrenheit).

2. **Lógica de Negocio**:
   - Al ingresar una provincia en el campo de filtro, se debe realizar una consulta a una API de clima para obtener los datos actuales y pronosticados.
   - Los datos obtenidos deben ser procesados y mostrados en las secciones correspondientes de la interfaz de usuario.
   - Al cambiar la unidad de temperatura, los valores deben actualizarse correctamente.

3. **Componentes**:
   - `WeatherFilter`: Componente para ingresar la provincia.
   - `CurrentWeather`: Componente para mostrar los datos climáticos actuales.
   - `ForecastWeather`: Componente para mostrar los datos climáticos pronosticados.
   - `TemperatureUnitSelector`: Componente para cambiar entre unidades de temperatura.

## Pruebas

### Prueba 1: Consulta de provincia y visualización de datos actuales

![gif 1 Sprint 2 3](https://github.com/user-attachments/assets/e9a41881-02cb-487d-92ae-1de83d1f72e6)


### Prueba 2: Cambio entre unidades de temperatura


![gif 2 Sprint 2 3](https://github.com/user-attachments/assets/61f33a69-0787-4568-bb28-05735c75877d)




Historia de Usuario 1: 
Como usuario, quiero agregar productos a un carrito de compras para realizar una compra en línea

Criterios de Aceptación:
Se debe poder agregar productos al carrito desde la página de detalles del producto.
El carrito debe reflejar correctamente los productos agregados con sus respectivas cantidades y precios.
Se debe poder eliminar productos del carrito.
Pruebas:
✅ Dado que un usuario visualiza un producto en la tienda,
Cuando hace clic en "Agregar al carrito",
Entonces el producto debe aparecer en el carrito con la cantidad correcta.

![gif 3 Sprint 2 3](https://github.com/user-attachments/assets/0e63f9a7-22a0-4d02-a265-10aeffad1c84)


✅ Dado que un usuario tiene varios productos en el carrito,
Cuando aumenta la cantidad de un producto,
Entonces el total del carrito se debe actualizar correctamente.

![gif 4 Sprint 2 3](https://github.com/user-attachments/assets/25121368-9123-405d-beb0-6bf4a382f3e4)


✅ Dado que un usuario tiene productos en el carrito,
Cuando elimina un producto,
Entonces el producto debe desaparecer del carrito y actualizar el total.

![gif 6 Sprint 2 3](https://github.com/user-attachments/assets/0c05663a-51a3-444b-b848-f455fc916b6d)



Historia de Usuario 2: Como usuario, quiero subir un artículo con texto e imágenes para compartir contenido en la plataforma
Criterios de Aceptación:
El usuario debe poder agregar un título, texto y al menos una imagen al artículo.
El sistema debe validar que la imagen tenga un formato permitido (JPG, PNG).
El artículo debe guardarse correctamente y mostrarse en la plataforma.
Pruebas:
✅ Dado que un usuario quiere publicar un artículo,
Cuando completa el título, texto y sube una imagen en un formato válido,
Entonces el sistema debe permitir la publicación del artículo.

![gif 5 Sprint 2 3](https://github.com/user-attachments/assets/9d8aeb57-350f-486b-8850-d92b46f28002)

✅ Dado que un usuario intenta subir un artículo,
Cuando no adjunta una imagen,
Entonces el sistema debe mostrar un mensaje de error indicando que la imagen es obligatoria.

✅ Dado que un usuario sube una imagen en un formato no permitido,
Cuando intenta publicar el artículo,
Entonces el sistema debe mostrar un mensaje de error indicando que el formato de la imagen no es válido.
