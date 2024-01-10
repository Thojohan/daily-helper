export function logoFinder(array) {
  if (
    array.properties.category.some(
      (el) => el === "ferryStop" || el === "harbourPort"
    ) &&
    array.properties.category.some(
      (el) => el === "onstreetBus" || el === "busStation"
    )
  )
    return "baatbuss-pink.png";
  if (
    array.properties.category.some(
      (el) => el === "metroStation" || el === "onstreetTram"
    ) &&
    array.properties.category.some(
      (el) => el === "onstreetBus" || el === "busStation"
    )
  )
    return "tbanebuss-pink.png";
  if (
    (array.properties.category.some((el) => el === "railStation") &&
      array.properties.category.some((el) => el === "onstreetBus")) ||
    array.properties.category.some((el) => el === "busStation")
  )
    return "togbuss-pink.png";
  if (
    (array.properties.category.some((el) => el === "airport") &&
      array.properties.category.some((el) => el === "onstreetBus")) ||
    array.properties.category.some((el) => el === "busStation")
  )
    return "flybuss-pink.png";
  if (
    array.properties.category.some((el) => el === "ferryStop") ||
    array.properties.category.some((el) => el === "harbourPort")
  )
    return "baat-pink.png";
  if (
    array.properties.category.some(
      (el) => el === "metroStation" || el === "onstreetTram"
    )
  )
    return "tbane-pink.png";
  if (array.properties.category.some((el) => el === "railStation"))
    return "tog-pink.png";
  if (
    array.properties.category.some((el) => el === "onstreetBus") ||
    array.properties.category.some((el) => el === "busStation")
  )
    return "buss-pink.png";

  return "default.png";
}
