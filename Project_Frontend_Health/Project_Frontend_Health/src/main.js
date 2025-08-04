document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calculate")

  // Selektiere alle kcal- und kJ-Zellen
  const resultKcalElements = document.querySelectorAll(".kcal_section-result_kcal")
  const resultKJElements = document.querySelectorAll(".kcal_section-result_kJ")

  form.addEventListener("submit", function (e) {
    e.preventDefault()

    const size = parseFloat(document.getElementById("size").value)
    const weight = parseFloat(document.getElementById("weight").value)
    const age = parseInt(document.getElementById("age").value)
    const activity = parseFloat(document.getElementById("activity-input").value)
    const gender = form.querySelector('input[name="gender"]:checked').value

    let grundumsatz
    if (gender === "male") {
      grundumsatz = 66.47 + 13.7 * weight + 5 * size - 6.8 * age
    } else {
      grundumsatz = 655.1 + 9.6 * weight + 1.8 * size - 4.7 * age
    }

    const gesamtumsatz = grundumsatz * activity
    const grundumsatz_kJ = grundumsatz * 4.184
    const gesamtumsatz_kJ = gesamtumsatz * 4.184

    resultKcalElements[0].textContent = `${grundumsatz.toFixed(0)} `
    resultKJElements[0].textContent = `${grundumsatz_kJ.toFixed(0)} `

    resultKcalElements[1].textContent = `${gesamtumsatz.toFixed(0)} `
    resultKJElements[1].textContent = `${gesamtumsatz_kJ.toFixed(0)} `
  })
})
