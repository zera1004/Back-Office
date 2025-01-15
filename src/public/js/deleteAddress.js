const urlParams = new URLSearchParams(window.location.search);
const addressId = urlParams.get('id');
const confirmDelete = document.querySelector('#confirmDelete');

confirmDelete.addEventListener('click', async () => {
  try {
    const response = await fetch(`api/users/me/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) throw new Error('주소 삭제에 실패했습니다.');

    alert('주소가 삭제되었습니다.');
    window.location.href = 'getAddress.html';
  } catch (error) {
    console.error('주소 삭제 오류:', error);
  }
});
