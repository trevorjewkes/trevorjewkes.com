function handleRadioButton(radioButton) {
	maleDiv = document.getElementById('maleForm')
	femaleDiv = document.getElementById('femaleForm')
	document.getElementById('mBodyFat').style.display = 'none'
	if (radioButton.value === 'Male') {
		maleDiv.style.display = 'block'
		femaleDiv.style.display = 'none'
	}
	else if (radioButton.value === 'Female') {
		maleDiv.style.display = 'none'
		femaleDiv.style.display = 'block'
	}
}

function calculateMaleBodyWeight() {
	weight = Number(document.getElementById('mBodyWeight').value)
	girth = Number(document.getElementById('mWaistGirth').value)
	result1 = (weight * 1.082) + 94.42
	leanBodyWeight = result1 - (girth * 4.15)
	finalResult = ((weight - leanBodyWeight) * 100) / weight
	document.getElementById('mBodyFat').innerText = 'Body Fat Percentage: ' + finalResult + '%'
	document.getElementById('mBodyFat').style.display = 'block'
}
