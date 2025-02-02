function recordVideoInfo() {
  const videoCards = document.querySelectorAll('.bili-video-card__info--tit a');

  videoCards.forEach(video => {
    const title = video.textContent.trim();
    const link = video.href;

    chrome.storage.local.get({ videoHistory: [] }, (result) => {
      const videoHistory = result.videoHistory;

       
      if (!videoHistory.some(item => item.link === link)) {
        videoHistory.push({ title, link });

        // 只保留最近 20 个视频记录
        chrome.storage.local.set({ videoHistory: videoHistory.slice(-50) }, () => {
          console.log(`已记录视频: ${title}`);
        });
      }
    });
  });
}

// 动态监听 Bilibili 的“换一换”按钮
const observer = new MutationObserver(() => {
  recordVideoInfo();
});


window.addEventListener('load', () => {
  const targetNode = document.body;
  observer.observe(targetNode, { childList: true, subtree: true });
});
