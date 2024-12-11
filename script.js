//queen never cry.

document.addEventListener("DOMContentLoaded", () => {
    const leftList = document.querySelector("#list1"); 
    const rightList = document.querySelector("#list2"); 
    const presentImage = document.querySelector(".present-bottom img"); 


    const shuffleList = (list) => {
        const items = Array.from(list.children);
        const shuffled = items.sort(() => Math.random() - 0.5);
        shuffled.forEach(item => list.appendChild(item));
    };

   
    const getMatchingCount = () => {
        const leftItems = Array.from(leftList.children);
        const rightItems = Array.from(rightList.children);

        return leftItems.reduce((count, leftItem, index) => {
            const rightItem = rightItems[index];
            const leftOrder = leftItem.dataset.order;
            const rightOrder = rightItem.dataset.order;

            if (leftOrder === rightOrder) {
                return count + 1; 
            }
            return count;
        }, 0);
    };

  
    const updateImageBlur = () => {
        const totalItems = leftList.children.length; // 총 아이템 개수
        const matchingCount = getMatchingCount(); // 현재 매칭된 순서 개수

        const maxBlur = 50; // 최대 블러 값
        const blurStep = maxBlur / totalItems; // 매칭 하나당 감소하는 블러 값
        const blurValue = maxBlur - matchingCount * blurStep; // 현재 블러 값 계산

        console.log(`매칭 개수: ${matchingCount}, 블러 값: ${blurValue}px`);
        presentImage.style.filter = `blur(${blurValue}px)`; // 이미지 블러 업데이트
    };


    const addDragAndDropEvents = (items, list, listId) => {
        Array.from(items).forEach(item => {
            item.addEventListener("dragstart", () => {
                item.classList.add("dragging");
            });

            item.addEventListener("dragend", () => {
                item.classList.remove("dragging");
                updateImageBlur(); // 드래그 종료 후 이미지 블러 업데이트
            });

            list.addEventListener("dragover", (e) => handleDragOver(list, e, listId));
        });
    };

    // 드래그 앤 드롭 동작 처리 함수
    const handleDragOver = (list, e, listId) => {
        e.preventDefault(); // 기본 동작 방지

        const draggingItem = document.querySelector(".dragging");
        const draggingParentId = draggingItem.parentElement.id; // 드래그 중인 항목의 부모 리스트 ID

        // 조건: draggingItem이 해당 리스트에서만 드래그 가능하도록 제한
        if ((listId === "list1" && draggingParentId !== "list1") || 
            (listId === "list2" && draggingParentId !== "list2")) {
            return; // 잘못된 리스트로의 드래그를 막음
        }

        const siblings = Array.from(list.querySelectorAll(".item:not(.dragging)"));

        const nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });

        list.insertBefore(draggingItem, nextSibling); // 드래그한 아이템 재배치
    };

    // 초기화 함수: 랜덤 섞기 + 초기 블러 값 설정
    const initialize = () => {
        shuffleList(leftList);
        shuffleList(rightList);

    
        const initialMatchingCount = getMatchingCount(); 
        const totalItems = leftList.children.length;

   
        const maxBlur = 50; 
        const blurStep = maxBlur / totalItems; 
        const initialBlurValue = maxBlur - initialMatchingCount * blurStep;

        console.log(`초기 매칭 개수: ${initialMatchingCount}, 초기 블러 값: ${initialBlurValue}px`);
        presentImage.style.filter = `blur(${initialBlurValue}px)`; 

     
        addDragAndDropEvents(leftList.children, leftList, "list1");
        addDragAndDropEvents(rightList.children, rightList, "list2");
    };

 //what the fuck is this
    initialize();
});


const bga = document.querySelector('.bga');

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // 마우스 위치를 중심으로 원형으로 bga를 지움
    bga.style.clipPath = `circle(100px at ${x}px ${y}px)`; // 100px은 원 크기
});