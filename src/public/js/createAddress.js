const addressForm = document.querySelector('#addressForm');

// 주소 등록 이벤트
addressForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const addressName = document.querySelector('#addressName').value.trim();
  const address = document.querySelector('#address').value.trim();

  if (!addressName || !address) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  try {
    // 기존 주소 개수 확인
    const countResponse = await fetch('api/users/me/addresses', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!countResponse.ok) {
      throw new Error('주소 개수를 확인하지 못했습니다.');
    }

    const { data: addresses } = await countResponse.json();
    if (addresses.length >= 5) {
      alert('최대 5개의 주소만 등록할 수 있습니다.');
      return;
    }

    // 주소 등록 요청
    const response = await fetch('api/users/me/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ addressName, address }),
    });

    if (!response.ok) {
      throw new Error('주소 등록에 실패했습니다.');
    }

    alert('주소가 등록되었습니다.');
    window.location.href = 'getAddress.html'; // 조회 페이지로 이동
  } catch (error) {
    console.error('등록 오류:', error);
    alert(error.message || '오류가 발생했습니다.');
  }
});
