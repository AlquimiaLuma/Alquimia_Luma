import json
import os

ARCHIVO = 'productos.json'

def cargar_datos():
    with open(ARCHIVO, 'r', encoding='utf-8') as f:
        return json.load(f)

def guardar_datos(datos):
    with open(ARCHIVO, 'w', encoding='utf-8') as f:
        json.dump(datos, f, indent=4, ensure_ascii=False)

def main():
    while True:
        datos = cargar_datos()
        print("\n=== PANEL DE CONTROL: ALQIMIA LUMA ===")
        print("1. Ver Inventario | 2. Agregar | 3. Vender | 5. 🚀 SUBIR A INTERNET | 6. Salir")
        opcion = input("Elige: ")
        if opcion == '1':
            for i, p in enumerate(datos): print(f"ID: {i} | {p['nombre']} | Stock: {p['stock']}")
        elif opcion == '5':
            os.system("git add .")
            os.system('git commit -m "Actualizacion Inventario"')
            os.system("git push")
            print("🚀 ¡Cambios enviados a internet!")
        elif opcion == '6': break
if __name__ == "__main__": main()