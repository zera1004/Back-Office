const addressForm = document.querySelector('#addressForm');

// 주소 등록 이벤트
addressForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const addressName = document.querySelector('#addressName').value;
  const address = document.querySelector('#address').value;

  try {
    const response = await fetch('api/users/me/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 인증 토큰
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
  }
});
