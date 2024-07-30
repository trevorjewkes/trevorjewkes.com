function handleRadioButton(radioButton) {
	maleDiv = document.getElementById('maleForm')
	femaleDiv = document.getElementById('femaleForm')
	if (radioButton.value === 'Male') {
		maleDiv.style.display = 'block'
		femaleDiv.style.display = 'none'
	}
	else if (radioButton.value === 'Female') {
		maleDiv.style.display = 'none'
		femaleDive.style.display = 'block'
	}
}
