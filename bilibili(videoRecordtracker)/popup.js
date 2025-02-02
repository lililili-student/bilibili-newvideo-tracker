document.addEventListener('DOMContentLoaded', () => {
  const videoList = document.getElementById('videoList');
  const clearBtn = document.getElementById('clearBtn');

  // 加载保存的视频记录
  chrome.storage.local.get({ videoHistory: [] }, (result) => {
    videoList.innerHTML = ''; // 清空“加载中...”文本

    if (result.videoHistory.length === 0) {
      videoList.textContent = '暂无记录。';
    } else {
      result.videoHistory.forEach(video => {
        const link = document.createElement('a');
        link.href = video.link;
        link.textContent = video.title;
        link.target = '_blank';
        videoList.appendChild(link);
      });
    }
  });

  // 清空记录
  clearBtn.addEventListener('click', () => {
    chrome.storage.local.set({ videoHistory: [] }, () => {
      videoList.innerHTML = '暂无记录。';
      console.log('已清空所有记录');
    });
  });
});
