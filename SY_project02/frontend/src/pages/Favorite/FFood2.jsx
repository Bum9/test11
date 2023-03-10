import * as styled_F from "../../styled/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { useState, useLayoutEffect } from "react";
import { removeFromCart } from "../../features/favorite/favoriteSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { SERVER_URL } from "../../util/urls";
import axios from "axios";

export const FFood = () => {
  //요청한 데이터
  const [data, setData] = useState();

  // 체크된 아이템 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 전체 선택 버튼 클릭 인지 용
  const [click, setClick] = useState(false);

  const favorite = useSelector((state) => state.favorite);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const post = {
    email: user?.email,
    items: checkItems,
  };

  // 목록 요청
  useLayoutEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `${SERVER_URL}/bookmarks/sendBookmarks`,
        { data: post },
        { withCredentials: true }
      );
      // console.log(response?.data);
      setData(response.data);
    };
    fetchData();
  }, []);
  const serverData = data?.bookmarkedProducts;
  console.log(data?.bookmarkedProducts);

  const handleAllCheck = (checked) => {
    if (checked) {
      // 체크 시 모든 아이템을 배열에 추가
      let idArray = [];
      serverData?.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      // 체크 해제 시 빈 배열
      setCheckItems([]);
    }
  };

  console.log(checkItems);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 체크 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 체크 해제 시 체크된 아이템을 제외한 나머지 배열
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const onClickAll = () => {
    setClick(!click);
    if (!click) {
      const idArray = [];
      serverData?.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else if (click) {
      setCheckItems([]);
    }
  };

  const handleRemove = () => {
    if (checkItems.length === 0) {
      alert("삭제 할 푸드를 선택하세요.");
    } else {
      dispatch(removeFromCart(checkItems));
      axios.put(
        `${SERVER_URL}/bookmarks/deleteBookmarks`,
        { data: post },
        { withCredentials: true }
      );
      setCheckItems([]);
    }
  };

  // 나중에 워밍 옵션 take in, out 추가 되면 여기다도 넣기
  const onClick = () => {
    if (checkItems.length === 0) {
      alert("장바구니로 이동 할 푸드를 선택하세요.");
    } else {
      favorite.favorites.map((food) => {
        if (checkItems.includes(food.id)) {
          if (food.cooked) {
            dispatch(
              addToCart({
                id: food.id,
                name: food.name,
                size: food.size,
                cooked: food.cooked,
                takeout: food.takeout,
                price: food.price,
                category: food.category,
                quantity: food.quantity,
              })
            );
          } else {
            dispatch(
              addToCart({
                id: food.id,
                name: food.name,
                size: food.size,
                takeout: food.takeout,
                price: food.price,
                category: food.category,
                quantity: food.quantity,
              })
            );
          }
        }
      });
      alert("장바구니로 이동했습니다.");
    }
  };

  //
  // useEffect(() => {
  //     favorite.favorites.map((food) => {
  //         if (food.category === "브레드" || food.category === "케이크" || food.category === "샌드위치" || food.category === "샐러드" || food.category === "따뜻한 푸드") {
  //             console.log("22222222=>", food);
  //             setFood(food);
  //         }
  //     })
  // }, []);
  //
  // console.log("food =>", food);

  return (
    <styled_F.FCDd1>
      <styled_F.FCDP1 />
      <styled_F.FCDArticle1>
        <styled_F.FCDFieldset1>
          {serverData?.length === 0 ? (
            <styled_F.FCDTable1>
              <styled_F.FCDTColgroup>
                <col style={{ width: "52px" }} />
                <col style={{ width: "60px" }} />
                <col style={{ width: "210px" }} />
                <col style={{ width: "185px" }} />
                <col style={{ width: "204px" }} />
                <col style={{ width: "114px" }} />
              </styled_F.FCDTColgroup>
              <styled_F.FCDTHead1>
                <styled_F.FCDTHTr1>
                  <styled_F.FCDTHTh1>
                    {/*체크박스 체크시 이미지 변경*/}
                    <styled_F.FCDTHThDiv1>
                      <styled_F.FCDTHThDInput1
                        type={"checkbox"}
                        title={"전체 선택"}
                        disabled
                      />
                    </styled_F.FCDTHThDiv1>
                  </styled_F.FCDTHTh1>
                  <styled_F.FCDTHTh1>No</styled_F.FCDTHTh1>
                  <styled_F.FCDTHTh1>푸드명</styled_F.FCDTHTh1>
                  <styled_F.FCDTHTh1>워밍 옵션</styled_F.FCDTHTh1>
                  <styled_F.FCDTHTh1>메뉴 추가</styled_F.FCDTHTh1>
                  <styled_F.FCDTHTh1>등록일</styled_F.FCDTHTh1>
                </styled_F.FCDTHTr1>
              </styled_F.FCDTHead1>
              <styled_F.FCDTHTbody1>
                <styled_F.FCDTHTbodyTd1 colSpan={6}>
                  데이터가 없습니다.
                </styled_F.FCDTHTbodyTd1>
              </styled_F.FCDTHTbody1>
            </styled_F.FCDTable1>
          ) : (
            <>
              <styled_F.FCDTable1>
                <styled_F.FCDTColgroup>
                  <col style={{ width: "52px" }} />
                  <col style={{ width: "60px" }} />
                  <col style={{ width: "210px" }} />
                  <col style={{ width: "185px" }} />
                  <col style={{ width: "204px" }} />
                  <col style={{ width: "114px" }} />
                </styled_F.FCDTColgroup>
                <styled_F.FCDTHead1>
                  <styled_F.FCDTHTr1>
                    <styled_F.FCDTHTh1>
                      {/*체크박스 체크시 이미지 변경*/}
                      <styled_F.FCDTHThDiv1>
                        <styled_F.FCDTHThDInput1
                          type={"checkbox"}
                          title={"전체 선택"}
                          onChange={(e) => handleAllCheck(e.target.checked)}
                          // 데이터의 수와 체크된 아이템의 수가 다를 때 체크 해제
                          checked={
                            checkItems.length === favorite.favorites.length
                          }
                        />
                      </styled_F.FCDTHThDiv1>
                    </styled_F.FCDTHTh1>
                    <styled_F.FCDTHTh1>No</styled_F.FCDTHTh1>
                    <styled_F.FCDTHTh1>푸드명</styled_F.FCDTHTh1>
                    <styled_F.FCDTHTh1>워밍 옵션</styled_F.FCDTHTh1>
                    <styled_F.FCDTHTh1>메뉴 추가</styled_F.FCDTHTh1>
                    <styled_F.FCDTHTh1>등록일</styled_F.FCDTHTh1>
                  </styled_F.FCDTHTr1>
                </styled_F.FCDTHead1>
                {serverData?.map((sData) => {
                  console.log("sData ==>", sData);
                  if (
                    sData?.category === "브레드" ||
                    sData?.category === "케이크" ||
                    sData?.category === "샌드위치" ||
                    sData?.category === "샐러드" ||
                    sData?.category === "따뜻한 푸드"
                  ) {
                    return (
                      <styled_F.FCDTHTbody1 key={sData?.id}>
                        <styled_F.FCDTHTbodyTdOK>
                          <styled_F.FCDTHThDiv1>
                            <styled_F.FCDTHThDInput1
                              type={"checkbox"}
                              title={"개별 선택"}
                              onChange={(e) =>
                                handleSingleCheck(
                                  e.target.checked,
                                  sData?.Product?.id
                                )
                              }
                              // 체크된 아이템 배열에 해당 데이터가 있을 경우 활성화
                              checked={checkItems.includes(sData?.id)}
                            />
                          </styled_F.FCDTHThDiv1>
                        </styled_F.FCDTHTbodyTdOK>
                        <styled_F.FCDTHTbodyTdOK>
                          {sData?.Product?.p_id}
                        </styled_F.FCDTHTbodyTdOK>
                        <styled_F.FCDTHTbodyTdOK>
                          {sData?.Product?.name}
                        </styled_F.FCDTHTbodyTdOK>
                        <styled_F.FCDTHTbodyTdOK>
                          {sData?.cookType
                            ? sData?.cookType === "Desert"
                              ? "따뜻하게 데움"
                              : "데우지 않음"
                            : "워밍 옵션 없음"}
                        </styled_F.FCDTHTbodyTdOK>
                        <styled_F.FCDTHTbodyTdOK></styled_F.FCDTHTbodyTdOK>
                        <styled_F.FCDTHTbodyTdOK>
                          {sData?.updatedAt.replace(/T|\.000Z/g, " ")}
                        </styled_F.FCDTHTbodyTdOK>
                      </styled_F.FCDTHTbody1>
                    );
                  }
                })}
              </styled_F.FCDTable1>
              <styled_F.FCDADiv>
                <styled_F.FCDADUl>
                  {/*전체 선택*/}
                  <styled_F.FCDADLi>
                    <styled_F.FCDADLA onClick={onClickAll}>
                      전체 선택
                    </styled_F.FCDADLA>
                  </styled_F.FCDADLi>
                  <styled_F.FCDADLi>
                    <styled_F.FCDADLA onClick={handleRemove}>
                      선택 삭제
                    </styled_F.FCDADLA>
                  </styled_F.FCDADLi>
                  <styled_F.FCDADLiCart>
                    <styled_F.FCDADLACart onClick={onClick}>
                      장바구니 이동
                    </styled_F.FCDADLACart>
                  </styled_F.FCDADLiCart>
                </styled_F.FCDADUl>
              </styled_F.FCDADiv>
            </>
          )}
        </styled_F.FCDFieldset1>
      </styled_F.FCDArticle1>
    </styled_F.FCDd1>
  );
};

//                     {favorite.favorites.length === 0 ? (
//                         <styled_F.FCDTable1>
//                             <styled_F.FCDTColgroup>
//                                 <col style={{width: "52px"}}/>
//                                 <col style={{width: "100px"}}/>
//                                 <col style={{width: "210px"}}/>
//                                 <col style={{width: "185px"}}/>
//                                 <col style={{width: "164px"}}/>
//                                 <col style={{width: "114px"}}/>
//                             </styled_F.FCDTColgroup>
//                             <styled_F.FCDTHead1>
//                                 <styled_F.FCDTHTr1>
//                                     <styled_F.FCDTHTh1>
//                                         {/*체크박스 체크시 이미지 변경*/}
//                                         <styled_F.FCDTHThDiv1>
//                                             <styled_F.FCDTHThDInput1
//                                                 type={"checkbox"}
//                                                 title={"전체 선택"}
//                                                 disabled
//                                             />
//                                         </styled_F.FCDTHThDiv1>
//                                     </styled_F.FCDTHTh1>
//                                     <styled_F.FCDTHTh1>No</styled_F.FCDTHTh1>
//                                     <styled_F.FCDTHTh1>푸드명</styled_F.FCDTHTh1>
//                                     <styled_F.FCDTHTh1>워밍 옵션</styled_F.FCDTHTh1>
//                                     <styled_F.FCDTHTh1>메뉴 추가</styled_F.FCDTHTh1>
//                                     <styled_F.FCDTHTh1>등록일</styled_F.FCDTHTh1>
//                                 </styled_F.FCDTHTr1>
//                             </styled_F.FCDTHead1>
//                             <styled_F.FCDTHTbody1>
//                                 <styled_F.FCDTHTbodyTd1 colSpan={6}>데이터가 없습니다.</styled_F.FCDTHTbodyTd1>
//                             </styled_F.FCDTHTbody1>
//                         </styled_F.FCDTable1>
//                     ) : (
//                         <>
//                             <styled_F.FCDTable1>
//                                 <styled_F.FCDTColgroup>
//                                     <col style={{width: "52px"}}/>
//                                     <col style={{width: "100px"}}/>
//                                     <col style={{width: "210px"}}/>
//                                     <col style={{width: "185px"}}/>
//                                     <col style={{width: "164px"}}/>
//                                     <col style={{width: "114px"}}/>
//                                 </styled_F.FCDTColgroup>
//                                 <styled_F.FCDTHead1>
//                                     <styled_F.FCDTHTr1>
//                                         <styled_F.FCDTHTh1>
//                                             {/*체크박스 체크시 이미지 변경*/}
//                                             <styled_F.FCDTHThDiv1>
//                                                 <styled_F.FCDTHThDInput1
//                                                     type={"checkbox"}
//                                                     title={"전체 선택"}
//                                                     onChange={(e) => handleAllCheck(e.target.checked)}
//                                                     // 데이터의 수와 체크된 아이템의 수가 다를 때 체크 해제
//                                                     checked={checkItems.length === serverData?.length}
//                                                 />
//                                             </styled_F.FCDTHThDiv1>
//                                         </styled_F.FCDTHTh1>
//                                         <styled_F.FCDTHTh1>No</styled_F.FCDTHTh1>
//                                         <styled_F.FCDTHTh1>푸드명</styled_F.FCDTHTh1>
//                                         <styled_F.FCDTHTh1>워밍 옵션</styled_F.FCDTHTh1>
//                                         <styled_F.FCDTHTh1>메뉴 추가</styled_F.FCDTHTh1>
//                                         <styled_F.FCDTHTh1>등록일</styled_F.FCDTHTh1>
//                                     </styled_F.FCDTHTr1>
//                                 </styled_F.FCDTHead1>
//                                 {serverData?.map((food) => {
//                                     if (food?.category === "브레드" || food?.category === "케이크" || food?.category === "샌드위치" || food?.category === "샐러드" || food?.category === "따뜻한 푸드") {
//                                         return (
//                                             <styled_F.FCDTHTbody1 key={food?.Product?.p_id}>
//                                                 <styled_F.FCDTHTbodyTdOK>
//                                                     <styled_F.FCDTHThDiv1>
//                                                         <styled_F.FCDTHThDInput1
//                                                             type={"checkbox"}
//                                                             title={"개별 선택"}
//                                                             onChange={(e) => handleSingleCheck(e.target.checked, food?.Product?.p_id)}
//                                                             // 체크된 아이템 배열에 해당 데이터가 있을 경우 활성화
//                                                             checked={checkItems.includes(food?.Product?.p_id)}
//                                                         />
//                                                     </styled_F.FCDTHThDiv1>
//                                                 </styled_F.FCDTHTbodyTdOK>
//                                                 <styled_F.FCDTHTbodyTdOK>{food?.Product?.id}</styled_F.FCDTHTbodyTdOK>
//                                                 <styled_F.FCDTHTbodyTdOK>{food?.Product?.name}</styled_F.FCDTHTbodyTdOK>
//                                                 <styled_F.FCDTHTbodyTdOK>
//                                                     {food?.cooked ? favorite.cooked === "Desert" ? "따뜻하게 데움" : "데우지 않음" : "워밍 옵션 없음"}
//                                                 </styled_F.FCDTHTbodyTdOK>
//                                                 <styled_F.FCDTHTbodyTdOK></styled_F.FCDTHTbodyTdOK>
//                                                 <styled_F.FCDTHTbodyTdOK>{food?.updatedAt.replace(/T|\.000Z/g, " ")}</styled_F.FCDTHTbodyTdOK>
//                                             </styled_F.FCDTHTbody1>
//                                         )
//                                     }
//                                 })}
//                             </styled_F.FCDTable1>
//                             <styled_F.FCDADiv>
//                                 <styled_F.FCDADUl>
//                                     {/*전체 선택*/}
//                                     <styled_F.FCDADLi>
//                                         <styled_F.FCDADLA
//                                             onClick={onClickAll}
//                                         >
//                                             전체 선택
//                                         </styled_F.FCDADLA>
//                                     </styled_F.FCDADLi>
//                                     <styled_F.FCDADLi>
//                                         <styled_F.FCDADLA
//                                             onClick={handleRemove}
//                                         >
//                                             선택 삭제
//                                         </styled_F.FCDADLA>
//                                     </styled_F.FCDADLi>
//                                     <styled_F.FCDADLiCart>
//                                         <styled_F.FCDADLACart
//                                             onClick={onClick}
//                                         >
//                                             장바구니 이동
//                                         </styled_F.FCDADLACart>
//                                     </styled_F.FCDADLiCart>
//                                 </styled_F.FCDADUl>
//                             </styled_F.FCDADiv>
//                         </>
//                     )}
//                 </styled_F.FCDFieldset1>
//             </styled_F.FCDArticle1>
//         </styled_F.FCDd1>
//     );
// };
