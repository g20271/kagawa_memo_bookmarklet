console.log('DOMContentLoaded event fired. Creating dynamic script...');

// 新しい script 要素を作成
const newScript = document.createElement('script');

// 挿入するインラインコードを定義 (文字列連結を使用)
const inlineCode =
  '(function() {' + // IIFE 開始
  'console.log("Dynamically inserted inline script is executing...");' +

  // === .marubatsu 要素の監視 ===
  'try {' +
  'const marubatsuSpans = document.querySelectorAll(\'span.marubatsu\');' +
  'console.log("Found " + marubatsuSpans.length + " marubatsu spans.");' +
  'marubatsuSpans.forEach((span, index) => {' +
    'console.log("Setting up Marubatsu Observer " + (index + 1) + "/" + marubatsuSpans.length + " for:", span);' +

    // --- 初期状態設定関数 ---
    'const setInitialMarubatsuState = () => {' +
      'const initialText = span.textContent.trim();' +
      'const initialState = span.dataset.state || \'\';' +
      'const isDOMLoaded = document.readyState === \'interactive\' || document.readyState === \'complete\';' +
      'console.log("  Setting initial Marubatsu state. DOM readyState:", document.readyState, "isDOMLoaded:", isDOMLoaded);' +

      'if (isDOMLoaded) {' + // DOMロード済み
        'if (initialText && initialState !== initialText) {' +
          'span.dataset.state = initialText;' +
          'console.log("  Marubatsu initial state (DOM Loaded): data-state set from textContent \\"" + initialText + "\\"");' +
        '} else if (initialText) {' +
           'console.log("  Marubatsu initial state (DOM Loaded): data-state already matches textContent \\"" + initialText + "\\"");' +
        '} else if (initialState && !initialText) {' +
           'span.textContent = initialState;' +
           'console.log("  Marubatsu initial state (DOM Loaded): textContent set from data-state \\"" + initialState + "\\"");' +
        '} else {' +
           'console.log("  Marubatsu initial state (DOM Loaded): textContent is empty or matches data-state.");' +
        '}' +
      '} else {' + // DOMロード中
        'if (initialState && initialText !== initialState) {' +
          'span.textContent = initialState;' +
          'console.log("  Marubatsu initial state (DOM Loading): textContent set from data-state \\"" + initialState + "\\"");' +
        '} else if (initialState) {' +
           'console.log("  Marubatsu initial state (DOM Loading): textContent already matches data-state \\"" + initialState + "\\"");' +
        '} else if (initialText) {' +
          'span.dataset.state = initialText;' +
          'console.log("  Marubatsu initial state (DOM Loading): data-state set from initial textContent \\"" + initialText + "\\"");' +
        '} else {' +
          'console.log("  Marubatsu initial state (DOM Loading): Both textContent and data-state are empty.");' +
        '}' +
      '}' +
    '};' +
    'setInitialMarubatsuState();' +

    // --- Mutation Observer コールバック ---
    'const marubatsuMutationCallback = (mutationsList, observer) => {' +
      'const isDOMLoaded = document.readyState === \'interactive\' || document.readyState === \'complete\';' +
      'for (const mutation of mutationsList) {' +
        'if (mutation.type === \'characterData\' || (mutation.type === \'childList\' && mutation.target === span)) {' +
          'const newValue = span.textContent.trim();' +
          'const currentState = span.dataset.state || \'\';' +

          'if (isDOMLoaded) {' +
            'if (currentState !== newValue) {' +
              'span.dataset.state = newValue;' +
              'console.log("  Marubatsu MutationObserver (DOM Loaded): data-state updated to \\"" + newValue + "\\" for:", span);' +
            '}' +
          '} else {' +
            'if (currentState && newValue !== currentState) {' +
              'console.log("  Marubatsu MutationObserver (DOM Loading): Text changed to \\""+newValue+"\\", attempting to revert to data-state \\"" + currentState + "\\"");' +
              'try {' +
                'observer.disconnect();' +
                'span.textContent = currentState;' +
                'console.log("  Marubatsu MutationObserver (DOM Loading): textContent restored from data-state \\"" + currentState + "\\" for:", span);' +
                'const config = { characterData: true, childList: true, subtree: true };' +
                'observer.observe(span, config);' +
              '} catch (e) {' +
                'console.error("Error during DOM Loading state update:", e, span);' +
              '}' +
            '} else if (!currentState && newValue) {' +
               'span.dataset.state = newValue;' +
               'console.log("  Marubatsu MutationObserver (DOM Loading): Initial text detected, setting data-state to \\"" + newValue + "\\" for:", span);' +
            '}' +
          '}' +
          'break;' +
        '}' +
      '}' +
    '};' +

    // --- Observer の設定と開始 ---
    'const marubatsuObserver = new MutationObserver(marubatsuMutationCallback);' +
    'const marubatsuConfig = { characterData: true, childList: true, subtree: true };' +
    'try {' +
      'marubatsuObserver.observe(span, marubatsuConfig);' +
      'console.log("  Marubatsu MutationObserver started for:", span);' +
    '} catch (e) {' +
        'console.error("Error starting MutationObserver:", e, span);' +
    '}' +
  '});' +
  '} catch (error) {' +
    'console.error("Error during marubatsu observer setup:", error);' +
  '}' +

  // === .arroundmyblank 要素の処理 (変更なし) ===
  'try {' +
  'const arroundMyBlanks = Array.from(document.querySelectorAll(\'.arroundmyblank\'));' +
  'console.log("Found " + arroundMyBlanks.length + " arroundmyblank elements.");' +
  'arroundMyBlanks.forEach((originalArroundMyBlank, index) => {' +
    'console.log("Processing arroundmyblank element " + (index + 1) + "/" + arroundMyBlanks.length + ":", originalArroundMyBlank);' +
    'const clonedArroundMyBlank = originalArroundMyBlank.cloneNode(true);' +
    'if (originalArroundMyBlank.parentNode) {' +
      'originalArroundMyBlank.parentNode.replaceChild(clonedArroundMyBlank, originalArroundMyBlank);' +
    '} else {' +
      'console.warn("  Original .arroundmyblank element has no parentNode. Skipping.");' +
      'return;' +
    '}' +
    'const targetSpan = clonedArroundMyBlank.querySelector(\'span\');' +
    'if (targetSpan) {' +
      'console.log("  Found inner span, changing class name.");' +
      'targetSpan.className = \'_myblank_\';' +
      // ダブルクリック編集機能... (省略)
      'clonedArroundMyBlank.addEventListener(\'dblclick\', () => {' +
        'console.log("  Dblclick detected on:", clonedArroundMyBlank);' +
        'if (targetSpan.isContentEditable) return;' +
        'const originalText = targetSpan.textContent;' +
        'console.log("  Start editing. Original text: \\"" + originalText + "\\"");' +
        'targetSpan.contentEditable = \'true\';' +
        'targetSpan.style.outline = \'1px solid #007bff\';' +
        'targetSpan.style.backgroundColor = \'#f0f8ff\';' +
        'targetSpan.focus();' +
        'try {'+
          'const range = document.createRange();' +
          'range.selectNodeContents(targetSpan);' +
          'const selection = window.getSelection();' +
          'selection.removeAllRanges();' +
          'selection.addRange(range);' +
        '} catch(e) {console.warn("Could not select text:", e);}' +
        'let finishEditingOnBlur, finishEditingOnEnter;' +
        'const finishEditing = () => {' +
          'targetSpan.removeEventListener(\'blur\', finishEditingOnBlur);' +
          'targetSpan.removeEventListener(\'keydown\', finishEditingOnEnter);' +
          'console.log("  Finishing edit mode...");' +
          'const trimmedText = targetSpan.textContent.trim();' +
          'targetSpan.contentEditable = \'false\';' +
          'targetSpan.style.outline = \'\';' +
          'targetSpan.style.backgroundColor = \'\';' +
          'if (trimmedText === \'\') {' +
            'targetSpan.textContent = originalText;' +
            'console.log("  Edit cancelled (empty), restored to \\"" + originalText + "\\"");' +
          '} else {' +
            'targetSpan.textContent = trimmedText;' +
            'console.log("  Edit applied. New text: \\"" + trimmedText + "\\"");' +
          '}' +
        '};' +
        'finishEditingOnBlur = () => { finishEditing(); };' +
        'finishEditingOnEnter = (event) => {' +
          'if (event.key === \'Enter\' && !event.shiftKey) {' +
            'event.preventDefault(); finishEditing();' +
          '}' +
        '};' +
        'targetSpan.addEventListener(\'blur\', finishEditingOnBlur, { once: true });' +
        'targetSpan.addEventListener(\'keydown\', finishEditingOnEnter);' +
      '});' +
      'console.log("  Dblclick listener added.");' +
    '} else {' +
      'console.warn("  .arroundmyblank の中に span 要素が見つかりませんでした:", clonedArroundMyBlank);' +
    '}' +
  '});' +
  '} catch (error) {' +
    'console.error("Error during arroundmyblank processing:", error);' +
  '}' +

  'console.log("Dynamically inserted inline script finished executing.");' +
  '})();'; // IIFE 終了

// script 要素にインラインコードを設定
newScript.textContent = inlineCode;

// === script 要素の挿入処理 ===
if (document.body) {
  // body 内の既存の script タグを取得 (body 直下のみを対象とする)
  const existingScripts = document.body.querySelectorAll(':scope > script'); // :scope を使うことで body 直下のみを検索

  if (existingScripts.length > 0) {
    // 最初の script タグを取得
    const firstExistingScript = existingScripts[0];
    // その script タグの直前に新しい script を挿入
    document.body.insertBefore(newScript, firstExistingScript);
    console.log('Dynamic script tag inserted before the first script tag in body.');
  } else {
    // body 内に script タグが見つからない場合、末尾に追加
    document.body.appendChild(newScript);
    console.log('No existing script tags found directly in body. Appending dynamic script tag to body end.');
  }
} else {
  console.error('document.body not found. Cannot insert dynamic script.');
  // フォールバックとして documentElement に追加することも考えられる
  // document.documentElement.appendChild(newScript);
}