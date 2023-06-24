import sqlite3

# Crear una conexión a la base de datos
conn = sqlite3.connect('database.db')

# Crear un cursor para ejecutar comandos SQL
cursor = conn.cursor()

# Ejecutar una consulta SQL
cursor.execute('SELECT * FROM productos')

# Recuperar los resultados de la consulta
results = cursor.fetchall()

# Cerrar la conexión a la base de datos
conn.close()