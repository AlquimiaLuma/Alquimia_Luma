import json
import os

ARCHIVO = 'productos.json'

def cargar_datos():
    with open(ARCHIVO, 'r', encoding='utf-8') as f:
        return json.load(f)

def guardar_datos(datos):
    with open(ARCHIVO, 'w', encoding='utf-8') as f:
        json.dump(datos, f, indent=4, ensure_ascii=False)

def mostrar_inventario(datos):
    print("\n--- INVENTARIO ALQIMIA LUMA ---")
    for i, prod in enumerate(datos):
        estado_stock = f"{prod['stock']} uds" if prod['stock'] > 0 else "🚫 AGOTADO"
        print(f"ID: {i} | {prod['nombre']} | Precio: ${prod['precio']} | Inventario: {estado_stock}")
    print("--------------------------------\n")

def main():
    while True:
        datos = cargar_datos()
        print("=== PANEL DE CONTROL ===")
        print("1. Ver inventario actual")
        print("2. Agregar un nuevo perfume")
        print("3. Modificar precio o stock (Registrar venta)")
        print("4. Eliminar un perfume del catálogo")
        print("5. 🚀 SUBIR CAMBIOS A INTERNET")
        print("6. Salir")
        
        opcion = input("Elige una opción: ")

        if opcion == '1':
            mostrar_inventario(datos)
        elif opcion == '2':
            print("\n-- AGREGAR PERFUME --")
            nombre = input("Nombre del perfume: ")
            try:
                precio = int(input("Precio de venta (solo número): "))
                stock = int(input("Cantidad disponible (solo número): "))
            except ValueError:
                print("❌ Error: El precio y el stock deben ser números enteros.\n")
                continue
            desc = input("Descripción corta: ")
            nuevo = {
                "id": len(datos) + 1, "nombre": nombre, "precio": precio,
                "stock": stock, "desc": desc, "imagen": "📸 Foto del Perfume"
            }
            datos.append(nuevo)
            guardar_datos(datos)
            print(f"✅ ¡{nombre} agregado al catálogo!\n")
        elif opcion == '3':
            mostrar_inventario(datos)
            try:
                idx = int(input("Escribe el ID a modificar: "))
                if 0 <= idx < len(datos):
                    print("(Presiona Enter si no quieres cambiar el valor)")
                    n_precio = input(f"Nuevo precio (actual: ${datos[idx]['precio']}): ")
                    n_stock = input(f"Nuevo stock (actual: {datos[idx]['stock']}): ")
                    if n_precio: datos[idx]['precio'] = int(n_precio)
                    if n_stock: datos[idx]['stock'] = int(n_stock)
                    guardar_datos(datos)
                    print("✅ ¡Actualizado!\n")
            except ValueError:
                print("❌ Error: Solo números.\n")
        elif opcion == '4':
            mostrar_inventario(datos)
            try:
                idx = int(input("ID del perfume a borrar: "))
                if 0 <= idx < len(datos):
                    eliminado = datos.pop(idx)
                    guardar_datos(datos)
                    print(f"🗑️ ¡{eliminado['nombre']} eliminado!\n")
            except ValueError:
                print("❌ Error.\n")
        elif opcion == '5':
            print("\nSubiendo actualizaciones...")
            os.system("git add .")
            os.system('git commit -m "Actualizacion automatica"')
            os.system("git push")
            print("🚀 ¡LISTO! Página actualizada.\n")
        elif opcion == '6': break

if __name__ == "__main__": main()