function handleRadioButton(radioButton) {
	maleDiv = document.getElementById('maleForm')
	femaleDiv = document.getElementById('femaleForm')
	document.getElementById('mBodyFat').style.display = 'none'
	document.getElementById('fBodyFat').style.display = 'none'
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
	truncResult = Math.trunc(finalResult * 100) / 100
	document.getElementById('mBodyFat').innerText = 'Body Fat Percentage: ' + truncResult + '%'
	document.getElementById('mBodyFat').style.display = 'block'
}

function calculateFemaleBodyWeight() {
	weight = Number(document.getElementById('fBodyWeight').value)
	wrist = Number(document.getElementById('fWristCirc').value)
	waist = Number(document.getElementById('fWaistCirc').value)
	hip = Number(document.getElementById('fHipCirc').value)
	forearm = Number(document.getElementById('fForearmCirc').value)

	result1 = weight * 0.732
	result2 = result1 + 8.987
	result3 = wrist / 3.14
	result4 = waist * 0.157
	result5 = hip * 0.249
	result6 = forearm * 0.434
	result7 = result2 + result3
	result8 = result7 - result4
	result9= result8 - result5
	leanBodyWeight = result6 + result9
	finalResult = ((weight - leanBodyWeight) * 100) / weight
	truncResult = Math.truc(finalResult * 100) / 100
	document.getElementById('fBodyFat').innerText = 'Body Fat Percentage: ' + truncResult + '%'
	document.getElementById('fBodyFat').style.display = 'block'
}
