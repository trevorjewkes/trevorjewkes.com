function handleRadioButton(radioButton) {
	maleDiv = document.getElementById('maleForm')
	femaleDiv = document.getElementById('femaleForm')
	alert(radioButton.value)
	if (radioButton.value === 'Male') {
		maleDiv.style.display = 'block'
		femaleDiv.style.display = 'none'
	}
	else if (radioButton.value === 'Female') {
		maleDiv.style.display = 'none'
		femaleDiv.style.display = 'block'
	}
}
