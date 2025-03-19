import { atom, AtomMut } from "@reatom/core";

/**
 * Тип, который преобразует обычный тип данных в соответствующий атомарный тип
 * Например: { name: string } -> { name: AtomMut<string> }
 */
export type ToAtomType<T> = {
    [K in keyof T]: T[K] extends (infer U)[] 
        ? AtomMut<U[]> 
        : T[K] extends object 
            ? ToAtomType<T[K]> 
            : AtomMut<T[K]>
};

/**
 * Создает атомы Reatom из обычного объекта данных
 * @param data Исходный объект данных
 * @param prefix Опциональный префикс для имен атомов
 * @returns Объект с атомами Reatom
 */
export function createAtoms<T>(
    data: T, 
    prefix: string = ''
): ToAtomType<T> {
    const result = {} as ToAtomType<T>;
    
    for (const key in data) {
        const value = (data as Record<string, unknown>)[key];
        const atomName = prefix ? `${prefix}.${key}` : key;
        
        if (Array.isArray(value)) {
            // Если значение - массив, создаем один атом для всего массива
            (result[key as keyof T] as unknown) = atom<unknown[]>(value, atomName);
        } else if (value !== null && typeof value === 'object') {
            // Если значение - объект, рекурсивно создаем атомы для его свойств
            (result[key as keyof T] as unknown) = createAtoms(value, atomName);
        } else {
            // Если значение - примитив, создаем простой атом
            (result[key as keyof T] as unknown) = atom<unknown>(value, atomName);
        }
    }
    
    return result;
}

/**
 * Создает атомарную версию типа данных
 * @param initialData Начальные данные для инициализации атомов
 * @returns Объект с атомами Reatom
 */
export function createDataAtom<T>(initialData: T) {
    return atom(createAtoms(initialData));
}

/**
 * Пример использования:
 * 
 * // Определение типа данных
 * interface PersonalInfoData {
 *     name: string;
 *     job: string;
 *     email: string;
 * }
 * 
 * // Определение соответствующего атомарного типа (не требуется, если используется ToAtomType)
 * type PersonalInfoDataAtom = ToAtomType<PersonalInfoData>;
 * 
 * // Создание атома с начальными данными
 * const personalInfoData = createDataAtom<PersonalInfoData>({
 *     name: "",
 *     job: "",
 *     email: ""
 * });
 */ 