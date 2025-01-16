const urlParams = new URLSearchParams(window.location.search);
const addressId = urlParams.get('id');
const confirmMain = document.querySelector('#confirmMain');

confirmMain.addEventListener('click', async () => {
  try {
    const response = await fetch(`api/users/me/addresses/${addressId}/main`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('메인 주소 설정에 실패했습니다.');

    alert('메인 주소로 설정되었습니다.');
    window.location.href = 'getAddress.html';
  } catch (error) {
    console.error('메인 주소 설정 오류:', error);
  }
});
