export const prompts = [
    // --- 風格轉換 (Style Transfer) ---
    {
        id: "style-3d-figurine",
        title: "3D 公仔",
        category: "風格轉換",
        prompt: "將圖像轉換為栩栩如生的 3D 公仔模型，具有光澤的塑料質感，類似盲盒玩具。",
        description: "轉化為可愛的 3D 盲盒公仔風格。",
        tags: ["3D", "模型", "盲盒"],
        image: "/images/style-3d-figurine.png"
    },
    {
        id: "style-knitted-doll",
        title: "Q 版針織娃娃",
        category: "風格轉換",
        prompt: "將圖像快速轉換為 Q 版針織娃娃風格，展現毛線的編織紋理和柔軟質感。",
        description: "溫暖可愛的針織娃娃質感。",
        tags: ["針織", "Q版", "手工感"],
        image: "/images/style-knitted-doll.png"
    },
    {
        id: "style-character-capsule",
        title: "角色膠囊",
        category: "風格轉換",
        prompt: "從圖像中創建緊湊、風格化的角色膠囊，色彩鮮豔，具有玩具般的比例。",
        description: "濃縮成膠囊玩具風格。",
        tags: ["玩具", "膠囊", "設計"],
        image: "/images/style-character-capsule.png"
    },
    {
        id: "style-funko-pop",
        title: "Funko Pop 公仔",
        category: "風格轉換",
        prompt: "將圖像轉換為 Funko Pop 公仔風格，大頭小身體，黑色圓眼睛，乙烯基材質。",
        description: "經典的 Funko Pop 收藏公仔風格。",
        tags: ["Funko", "公仔", "流行文化"],
        image: "/images/style-funko-pop.png"
    },
    {
        id: "style-ghibli",
        title: "吉卜力風格",
        category: "風格轉換",
        prompt: "將圖像轉化為吉卜力工作室的動畫風格，色彩飽和，背景細膩，充滿手繪感。",
        description: "宮崎駿電影般的動畫風格。",
        tags: ["動漫", "吉卜力", "手繪感"],
        image: "/images/style-ghibli.png"
    },
    {
        id: "style-claymation",
        title: "黏土動畫",
        category: "風格轉換",
        prompt: "將圖像轉換為黏土動畫風格，具有指紋痕跡和不完美的表面質感，類似阿德曼動畫。",
        description: "復古有趣的黏土定格動畫風格。",
        tags: ["黏土", "定格動畫", "手工"],
        image: "/images/style-claymation.png"
    },
    {
        id: "style-pixel-art",
        title: "像素藝術",
        category: "風格轉換",
        prompt: "將圖像轉換為 16-bit 像素藝術風格，色彩鮮豔，輪廓清晰，懷舊遊戲感。",
        description: "復古電子遊戲像素風格。",
        tags: ["像素", "復古", "遊戲"],
        image: "/images/style-pixel-art.png"
    },
    {
        id: "style-origami",
        title: "摺紙藝術",
        category: "風格轉換",
        prompt: "將圖像中的物體轉換為摺紙藝術風格，由彩色紙張摺疊而成，具有幾何摺痕。",
        description: "精緻的紙藝摺紙風格。",
        tags: ["摺紙", "紙藝", "幾何"],
        image: "/images/style-origami.png"
    },
    {
        id: "style-low-poly",
        title: "低多邊形",
        category: "風格轉換",
        prompt: "將圖像轉換為低多邊形 (Low Poly) 3D 風格，幾何切面，簡約抽象。",
        description: "現代感的低多邊形 3D 藝術。",
        tags: ["低多邊形", "3D", "幾何"],
        image: "/images/style-low-poly.png"
    },
    {
        id: "style-watercolor",
        title: "水彩畫",
        category: "風格轉換",
        prompt: "將圖像轉換為水彩畫風格，色彩暈染自然，筆觸柔和，紙張紋理明顯。",
        description: "清新淡雅的水彩藝術。",
        tags: ["水彩", "繪畫", "藝術"],
        image: "/images/style-watercolor.png"
    },
    {
        id: "style-oil-painting",
        title: "油畫風格",
        category: "風格轉換",
        prompt: "將圖像轉換為古典油畫風格，厚重的筆觸，豐富的色彩層次，畫布紋理。",
        description: "經典厚重的油畫質感。",
        tags: ["油畫", "古典", "藝術"],
        image: "/images/style-oil-painting.png"
    },
    {
        id: "style-sketch",
        title: "鉛筆素描",
        category: "風格轉換",
        prompt: "將圖像轉換為鉛筆素描風格，線條細膩，陰影由排線構成，黑白灰階。",
        description: "手繪鉛筆素描質感。",
        tags: ["素描", "鉛筆", "手繪"],
        image: "/images/style-sketch.png"
    },
    {
        id: "style-ukiyo-e",
        title: "浮世繪",
        category: "風格轉換",
        prompt: "將圖像轉換為日本浮世繪風格，粗黑輪廓，平塗色彩，木刻版畫質感。",
        description: "傳統日本浮世繪版畫風格。",
        tags: ["浮世繪", "日本", "版畫"],
        image: "/images/style-ukiyo-e.png"
    },
    {
        id: "style-cyberpunk",
        title: "賽博龐克",
        category: "風格轉換",
        prompt: "將圖像轉換為賽博龐克風格，霓虹燈光，高科技低生活，藍紫配色。",
        description: "科幻未來的賽博龐克美學。",
        tags: ["賽博龐克", "科幻", "霓虹"],
        image: "/images/style-cyberpunk.png"
    },
    {
        id: "style-steampunk",
        title: "蒸氣龐克",
        category: "風格轉換",
        prompt: "將圖像轉換為蒸氣龐克風格，黃銅齒輪，皮革質感，維多利亞時代科幻。",
        description: "復古機械的蒸氣龐克風格。",
        tags: ["蒸氣龐克", "機械", "復古"],
        image: "/images/style-steampunk.png"
    },

    // --- 攝影效果 (Photography) ---
    {
        id: "photo-iphone-selfie",
        title: "iPhone 自拍",
        category: "攝影效果",
        prompt: "畫一張極其普通且不起眼的 iPhone 自拍，就像隨意的快照一樣。照片應包括輕微的動態模糊，光線不均勻。",
        description: "極度逼真的日常自拍。",
        tags: ["寫實", "自拍", "生活照"],
        image: "/images/photo-iphone-selfie.png"
    },
    {
        id: "photo-polaroid",
        title: "拍立得照片",
        category: "攝影效果",
        prompt: "一張復古拍立得照片，色彩略微褪色，閃光燈直打，帶有白色邊框。",
        description: "懷舊的拍立得成像風格。",
        tags: ["拍立得", "復古", "膠片"],
        image: "/images/photo-polaroid.png"
    },
    {
        id: "photo-macro",
        title: "微距攝影",
        category: "攝影效果",
        prompt: "極致微距攝影，清晰展現細節紋理，背景極度虛化，光線柔和。",
        description: "展現微觀世界的細節。",
        tags: ["微距", "細節", "攝影"],
        image: "/images/photo-macro.png"
    },
    {
        id: "photo-drone",
        title: "無人機空拍",
        category: "攝影效果",
        prompt: "高空無人機俯瞰視角，廣闊的景觀，幾何構圖，清晰銳利。",
        description: "上帝視角的壯觀空拍。",
        tags: ["空拍", "風景", "視角"],
        image: "/images/photo-drone.png"
    },
    {
        id: "photo-fisheye",
        title: "魚眼鏡頭",
        category: "攝影效果",
        prompt: "使用魚眼鏡頭拍攝，畫面中心誇張變形，邊緣彎曲，強烈的視覺衝擊。",
        description: "趣味誇張的魚眼視角。",
        tags: ["魚眼", "廣角", "趣味"],
        image: "/images/photo-fisheye.png"
    },
    {
        id: "photo-double-exposure",
        title: "雙重曝光",
        category: "攝影效果",
        prompt: "藝術性的雙重曝光照片，將人物輪廓與自然風景（如森林或星空）融合。",
        description: "夢幻的雙重曝光藝術。",
        tags: ["雙重曝光", "藝術", "創意"],
        image: "/images/photo-double-exposure.png"
    },
    {
        id: "photo-cinematic",
        title: "電影質感",
        category: "攝影效果",
        prompt: "電影級別的攝影質感，2.35:1 寬銀幕，變形鏡頭光斑，青橙色調 (Teal and Orange)。",
        description: "好萊塢大片般的電影畫面。",
        tags: ["電影", "質感", "寬銀幕"],
        image: "/images/photo-cinematic.png"
    },
    {
        id: "photo-black-and-white",
        title: "黑白肖像",
        category: "攝影效果",
        prompt: "高對比度的黑白肖像攝影，強調光影質感，眼神深邃，經典優雅。",
        description: "經典永恆的黑白人像。",
        tags: ["黑白", "肖像", "經典"],
        image: "/images/photo-black-and-white.png"
    },
    {
        id: "photo-long-exposure",
        title: "長曝光夜景",
        category: "攝影效果",
        prompt: "城市夜景長曝光，車燈形成流光軌跡，水面如鏡，星芒效果。",
        description: "流光溢彩的城市夜景。",
        tags: ["長曝光", "夜景", "光軌"],
        image: "/images/photo-long-exposure.png"
    },
    {
        id: "photo-tilt-shift",
        title: "移軸攝影",
        category: "攝影效果",
        prompt: "移軸攝影效果，俯瞰城市街道，使真實場景看起來像微縮模型玩具。",
        description: "小人國般的微縮模型效果。",
        tags: ["移軸", "微縮", "模型"],
        image: "/images/photo-tilt-shift.png"
    },

    // --- 角色設計 (Character Design) ---
    {
        id: "char-fantasy-warrior",
        title: "奇幻戰士",
        category: "角色設計",
        prompt: "一位身穿華麗銀色盔甲的精靈女戰士，手持發光長劍，背景是神秘森林。",
        description: "經典奇幻風格角色。",
        tags: ["奇幻", "精靈", "戰士"],
        image: "/images/char-fantasy-warrior.png"
    },
    {
        id: "char-scifi-cyborg",
        title: "科幻生化人",
        category: "角色設計",
        prompt: "半人半機械的生化人，面部有電路紋路，機械手臂，未來都市背景。",
        description: "未來科技感的生化角色。",
        tags: ["科幻", "生化人", "機械"],
        image: "/images/char-scifi-cyborg.png"
    },
    {
        id: "char-cute-monster",
        title: "可愛小怪獸",
        category: "角色設計",
        prompt: "一隻毛茸茸的圓形小怪獸，大眼睛，色彩粉嫩，抱著一顆星星。",
        description: "適合兒童插畫的可愛怪獸。",
        tags: ["怪獸", "可愛", "插畫"],
        image: "/images/char-cute-monster.png"
    },
    {
        id: "char-ancient-scholar",
        title: "古代學者",
        category: "角色設計",
        prompt: "一位穿著漢服的古代學者，在竹林中撫琴，氣質儒雅，水墨畫風。",
        description: "東方古典氣質角色。",
        tags: ["古風", "漢服", "水墨"],
        image: "/images/char-ancient-scholar.png"
    },
    {
        id: "char-superhero",
        title: "超級英雄",
        category: "角色設計",
        prompt: "一位原創超級英雄，身穿紅金配色的緊身戰衣，披風飄揚，站在摩天大樓頂端。",
        description: "美漫風格超級英雄。",
        tags: ["英雄", "漫畫", "動作"],
        image: "/images/char-superhero.png"
    },
    {
        id: "char-steampunk-inventor",
        title: "蒸氣龐克發明家",
        category: "角色設計",
        prompt: "一位戴著護目鏡的蒸氣龐克發明家，周圍是齒輪和圖紙，手持奇怪的機械裝置。",
        description: "充滿細節的蒸氣龐克角色。",
        tags: ["蒸氣龐克", "發明家", "細節"],
        image: "/images/char-steampunk-inventor.png"
    },
    {
        id: "char-anthropomorphic",
        title: "擬人化動物",
        category: "角色設計",
        prompt: "一隻穿著西裝打領帶的紳士貓，戴著單片眼鏡，在喝咖啡。",
        description: "趣味的擬人化動物角色。",
        tags: ["擬人", "動物", "趣味"],
        image: "/images/char-anthropomorphic.png"
    },
    {
        id: "char-dark-fantasy",
        title: "暗黑奇幻巫師",
        category: "角色設計",
        prompt: "一位被暗影籠罩的巫師，手持骷髏法杖，周圍漂浮著綠色鬼火，哥德風格。",
        description: "神秘陰暗的暗黑奇幻角色。",
        tags: ["暗黑", "巫師", "哥德"],
        image: "/images/char-dark-fantasy.png"
    },

    // --- 場景與環境 (Scenes) ---
    {
        id: "scene-cyber-city",
        title: "賽博都市",
        category: "場景與環境",
        prompt: "雨夜中的賽博龐克都市，霓虹招牌倒映在濕潤的街道，飛行汽車穿梭。",
        description: "經典的未來都市場景。",
        tags: ["賽博龐克", "都市", "夜景"],
        image: "/images/scene-cyber-city.png"
    },
    {
        id: "scene-magic-forest",
        title: "魔法森林",
        category: "場景與環境",
        prompt: "發光的魔法森林，巨大的蘑菇屋，空中漂浮著光點，夢幻氛圍。",
        description: "童話般的魔法森林。",
        tags: ["森林", "魔法", "童話"],
        image: "/images/scene-magic-forest.png"
    },
    {
        id: "scene-space-station",
        title: "太空站",
        category: "場景與環境",
        prompt: "環繞地球運行的巨大太空站，科技感十足的走廊，透過窗戶看到藍色地球。",
        description: "壯觀的太空科幻場景。",
        tags: ["太空", "科幻", "地球"],
        image: "/images/scene-space-station.png"
    },
    {
        id: "scene-underwater",
        title: "海底古城",
        category: "場景與環境",
        prompt: "深海中的亞特蘭提斯古城遺跡，被珊瑚覆蓋，魚群游過，光線透過海水折射。",
        description: "神秘的海底文明遺跡。",
        tags: ["海底", "遺跡", "神秘"],
        image: "/images/scene-underwater.png"
    },
    {
        id: "scene-desert-oasis",
        title: "沙漠綠洲",
        category: "場景與環境",
        prompt: "廣闊沙漠中的神秘綠洲，清澈的湖水，茂密的棕櫚樹，夕陽西下。",
        description: "充滿希望的沙漠景觀。",
        tags: ["沙漠", "綠洲", "風景"],
        image: "/images/scene-desert-oasis.png"
    },
    {
        id: "scene-snow-village",
        title: "雪山小鎮",
        category: "場景與環境",
        prompt: "阿爾卑斯山腳下的雪山小鎮，溫暖的燈光從木屋透出，漫天飛雪。",
        description: "溫馨的冬季雪景。",
        tags: ["雪景", "小鎮", "冬季"],
        image: "/images/scene-snow-village.png"
    },
    {
        id: "scene-post-apocalyptic",
        title: "末日廢墟",
        category: "場景與環境",
        prompt: "被植物吞噬的廢棄城市，生鏽的汽車，荒涼的街道，末日餘生氛圍。",
        description: "震撼的末日廢土場景。",
        tags: ["末日", "廢墟", "荒涼"],
        image: "/images/scene-post-apocalyptic.png"
    },
    {
        id: "scene-zen-garden",
        title: "日式庭園",
        category: "場景與環境",
        prompt: "寧靜的日式枯山水庭園，精心耙制的沙紋，青苔與石頭，楓紅點綴。",
        description: "寧靜致遠的禪意空間。",
        tags: ["日式", "庭園", "禪意"],
        image: "/images/scene-zen-garden.png"
    },

    // --- 產品設計 (Product Design) ---
    {
        id: "prod-sneaker",
        title: "潮鞋設計",
        category: "產品設計",
        prompt: "一雙未來風格的運動鞋設計，流線型鞋身，發光鞋底，懸浮展示。",
        description: "前衛的運動鞋概念設計。",
        tags: ["鞋", "設計", "潮流"],
        image: "/images/prod-sneaker.png"
    },
    {
        id: "prod-perfume",
        title: "香水瓶設計",
        category: "產品設計",
        prompt: "優雅的水晶香水瓶，鑽石切面，金色噴頭，置於絲綢背景上，高級感。",
        description: "奢華的化妝品包裝設計。",
        tags: ["香水", "包裝", "奢華"],
        image: "/images/prod-perfume.png"
    },
    {
        id: "prod-chair",
        title: "現代椅",
        category: "產品設計",
        prompt: "極簡主義風格的現代椅子，木材與皮革結合，造型獨特，置於明亮客廳。",
        description: "現代家具設計。",
        tags: ["家具", "椅子", "極簡"],
        image: "/images/prod-chair.png"
    },
    {
        id: "prod-headphones",
        title: "電競耳機",
        category: "產品設計",
        prompt: "帶有 RGB 燈光的無線電競耳機，黑色磨砂質感，科技感造型。",
        description: "酷炫的電子產品設計。",
        tags: ["耳機", "科技", "電子"],
        image: "/images/prod-headphones.png"
    },
    {
        id: "prod-watch",
        title: "機械錶",
        category: "產品設計",
        prompt: "精密的鏤空機械手錶，展現內部齒輪運作，藍寶石鏡面，金屬錶帶。",
        description: "精緻的鐘錶工藝展示。",
        tags: ["手錶", "機械", "工藝"],
        image: "/images/prod-watch.png"
    },

    // --- 美食攝影 (Food) ---
    {
        id: "food-sushi",
        title: "精緻壽司",
        category: "美食攝影",
        prompt: "一盤擺盤精緻的握壽司，新鮮的魚生光澤，黑色石板盛具，日式氛圍。",
        description: "令人垂涎的日式料理攝影。",
        tags: ["壽司", "美食", "日式"],
        image: "/images/food-sushi.png"
    },
    {
        id: "food-burger",
        title: "爆汁漢堡",
        category: "美食攝影",
        prompt: "一個巨大的美式漢堡，起司融化流下，新鮮生菜番茄，肉汁飽滿，廣告級攝影。",
        description: "極具誘惑力的快餐攝影。",
        tags: ["漢堡", "美食", "廣告"],
        image: "/images/food-burger.png"
    },
    {
        id: "food-dessert",
        title: "法式甜點",
        category: "美食攝影",
        prompt: "精緻的草莓慕斯蛋糕，金箔點綴，粉色系背景，下午茶氛圍。",
        description: "夢幻甜美的甜點攝影。",
        tags: ["甜點", "蛋糕", "下午茶"],
        image: "/images/food-dessert.png"
    },
    {
        id: "food-coffee",
        title: "手沖咖啡",
        category: "美食攝影",
        prompt: "正在手沖的咖啡，熱氣騰騰，深色背景，突出水流和咖啡粉的質感。",
        description: "充滿儀式感的咖啡攝影。",
        tags: ["咖啡", "手沖", "質感"],
        image: "/images/food-coffee.png"
    },
    {
        id: "food-fruit",
        title: "新鮮水果",
        category: "美食攝影",
        prompt: "切開的新鮮多汁西瓜，水珠清晰可見，陽光照射，色彩鮮豔。",
        description: "清新健康的水果特寫。",
        tags: ["水果", "新鮮", "特寫"],
        image: "/images/food-fruit.png"
    },

    // --- 圖像編輯 (Image Editing) ---
    {
        id: "edit-replace-bg",
        title: "更換背景",
        category: "圖像編輯",
        prompt: "將 [Image1] 的背景替換為 [所需背景]。保持主體不變，確保自然融合。",
        description: "完美替換背景環境。",
        tags: ["編輯", "背景", "合成"],
        image: "/images/edit-replace-bg.png"
    },
    {
        id: "edit-angles",
        title: "改變攝影角度",
        category: "圖像編輯",
        prompt: "從四個不同的攝影角度重現 [Image1] 中的人物。",
        description: "生成多角度視圖。",
        tags: ["多角度", "一致性", "角色設計"],
        image: "/images/edit-angles.png"
    },
    {
        id: "edit-restore",
        title: "修復老照片",
        category: "圖像編輯",
        prompt: "修復這張老照片，銳化細節，並應用自然的膚色和光線。",
        description: "老照片修復與上色。",
        tags: ["修復", "老照片", "增強"],
        image: "/images/edit-restore.png"
    },
    {
        id: "edit-remove-obj",
        title: "移除物體",
        category: "圖像編輯",
        prompt: "從圖像中移除[不需要的物體]，並用背景自然填充空缺。",
        description: "智能移除畫面中的雜物。",
        tags: ["移除", "修圖", "智能"],
        image: "/images/edit-remove-obj.png"
    },
    {
        id: "edit-change-clothes",
        title: "更換服裝",
        category: "圖像編輯",
        prompt: "將人物的衣服換成[描述新的服裝]，保持姿勢和身材不變。",
        description: "虛擬換裝體驗。",
        tags: ["換裝", "編輯", "時尚"],
        image: "/images/edit-change-clothes.png"
    },

    // --- 抽象與概念 (Abstract & Concept) ---
    {
        id: "abs-fluid",
        title: "流體藝術",
        category: "抽象與概念",
        prompt: "色彩斑斕的流體畫，顏料混合流動，形成獨特的紋理和圖案，高解析度。",
        description: "迷幻的流體藝術背景。",
        tags: ["流體", "抽象", "藝術"],
        image: "/images/abs-fluid.png"
    },
    {
        id: "abs-smoke",
        title: "彩色煙霧",
        category: "抽象與概念",
        prompt: "黑色背景中舞動的彩色煙霧，形態優美，漸變色彩，神秘氛圍。",
        description: "動態的煙霧攝影藝術。",
        tags: ["煙霧", "抽象", "攝影"],
        image: "/images/abs-smoke.png"
    },
    {
        id: "abs-fractal",
        title: "分形幾何",
        category: "抽象與概念",
        prompt: "複雜精細的 3D 分形幾何圖案，無限重複的結構，金屬質感，數學之美。",
        description: "數學與藝術結合的分形圖案。",
        tags: ["分形", "幾何", "數學"],
        image: "/images/abs-fractal.png"
    },
    {
        id: "abs-glass",
        title: "玻璃折射",
        category: "抽象與概念",
        prompt: "透過棱鏡折射的光線，形成彩虹光譜和幾何光影，晶瑩剔透。",
        description: "光影與玻璃的折射藝術。",
        tags: ["玻璃", "光影", "折射"],
        image: "/images/abs-glass.png"
    },
    {
        id: "abs-paper-cut",
        title: "層疊紙雕",
        category: "抽象與概念",
        prompt: "多層紙張切割堆疊而成的立體風景，光影投射出層次感，剪紙藝術。",
        description: "精緻的立體紙雕藝術。",
        tags: ["紙雕", "剪紙", "立體"],
        image: "/images/abs-paper-cut.png"
    },

    // --- 動物與生物 (Animals) ---
    {
        id: "animal-cat",
        title: "蓬鬆貓咪",
        category: "動物與生物",
        prompt: "一隻毛髮極其蓬鬆的波斯貓，藍色眼睛，陽光下毛髮邊緣發光，可愛特寫。",
        description: "治癒系寵物攝影。",
        tags: ["貓", "寵物", "可愛"],
        image: "/images/animal-cat.png"
    },
    {
        id: "animal-tiger",
        title: "威猛老虎",
        category: "動物與生物",
        prompt: "雪地中奔跑的西伯利亞虎，肌肉線條清晰，雪花飛濺，眼神犀利。",
        description: "充滿野性的野生動物攝影。",
        tags: ["老虎", "野生", "動物"],
        image: "/images/animal-tiger.png"
    },
    {
        id: "animal-bird",
        title: "翠鳥捕魚",
        category: "動物與生物",
        prompt: "翠鳥衝入水中捕魚的瞬間，水花四濺，羽毛色彩鮮豔，高速攝影。",
        description: "精彩的生態攝影瞬間。",
        tags: ["鳥", "生態", "攝影"],
        image: "/images/animal-bird.png"
    },
    {
        id: "animal-dragon",
        title: "東方神龍",
        category: "動物與生物",
        prompt: "雲霧中穿梭的東方神龍，金鱗閃耀，威嚴神聖，中國傳統風格。",
        description: "傳說中的神獸形象。",
        tags: ["龍", "神獸", "東方"],
        image: "/images/animal-dragon.png"
    },
    {
        id: "animal-jellyfish",
        title: "發光水母",
        category: "動物與生物",
        prompt: "深海中發光的透明水母，觸鬚飄逸，藍色螢光，夢幻般的海底生物。",
        description: "夢幻的深海生物。",
        tags: ["水母", "深海", "夢幻"],
        image: "/images/animal-jellyfish.png"
    },
    // --- 更多風格 (More Styles) ---
    {
        id: "style-sticker",
        title: "貼紙風格",
        category: "風格轉換",
        prompt: "將圖像設計成可愛的貼紙，粗白邊，平面向量風格，色彩簡單明快。",
        description: "適合打印的貼紙設計。",
        tags: ["貼紙", "向量", "設計"],
        image: "/images/style-sticker.png"
    },
    {
        id: "style-embroidery",
        title: "刺繡風格",
        category: "風格轉換",
        prompt: "將圖像轉換為刺繡風格，展現絲線的質感和針法，布料背景。",
        description: "傳統工藝刺繡質感。",
        tags: ["刺繡", "工藝", "質感"],
        image: "/images/style-embroidery.png"
    },
    {
        id: "style-stained-glass",
        title: "彩繪玻璃",
        category: "風格轉換",
        prompt: "將圖像轉換為教堂彩繪玻璃風格，黑色鉛條分割，透光的彩色玻璃。",
        description: "莊嚴華麗的彩繪玻璃藝術。",
        tags: ["玻璃", "藝術", "教堂"],
        image: "/images/style-stained-glass.png"
    },
    {
        id: "style-blueprint",
        title: "工程藍圖",
        category: "風格轉換",
        prompt: "將圖像轉換為工程藍圖風格，藍底白線，標註尺寸和技術細節。",
        description: "專業的技術藍圖風格。",
        tags: ["藍圖", "工程", "設計"],
        image: "/images/style-blueprint.png"
    },
    {
        id: "style-neon-line",
        title: "霓虹線條",
        category: "風格轉換",
        prompt: "黑色背景上的發光霓虹線條畫，簡約而時尚，賽博龐克氛圍。",
        description: "酷炫的霓虹線條藝術。",
        tags: ["霓虹", "線條", "藝術"],
        image: "/images/style-neon-line.png"
    },
    {
        id: "style-pop-art",
        title: "普普藝術",
        category: "風格轉換",
        prompt: "安迪·沃荷風格的普普藝術，高飽和度色彩，重複圖案，絲網印刷質感。",
        description: "色彩強烈的普普藝術。",
        tags: ["普普", "藝術", "色彩"],
        image: "/images/style-pop-art.png"
    },
    {
        id: "style-chalk",
        title: "粉筆畫",
        category: "風格轉換",
        prompt: "黑板上的粉筆畫風格，粉筆質感，黑板擦痕跡，手寫字體。",
        description: "校園懷舊的粉筆畫。",
        tags: ["粉筆", "黑板", "手繪"],
        image: "/images/style-chalk.png"
    },
    {
        id: "style-marble",
        title: "大理石雕塑",
        category: "風格轉換",
        prompt: "將人物轉換為古典大理石雕塑，潔白細膩，肌肉紋理逼真，博物館燈光。",
        description: "古典優雅的雕塑藝術。",
        tags: ["雕塑", "大理石", "藝術"],
        image: "/images/style-marble.png"
    },
    {
        id: "style-paper-quilling",
        title: "衍紙藝術",
        category: "風格轉換",
        prompt: "衍紙(Paper Quilling)風格，捲曲的紙條構成精美圖案，立體感強。",
        description: "精細的捲紙工藝。",
        tags: ["衍紙", "紙藝", "工藝"],
        image: "/images/style-paper-quilling.png"
    },
    {
        id: "style-woodcut",
        title: "木刻版畫",
        category: "風格轉換",
        prompt: "黑白木刻版畫風格，粗獷的刀觸，強烈的黑白對比。",
        description: "有力的版畫藝術。",
        tags: ["版畫", "木刻", "藝術"],
        image: "/images/style-woodcut.png"
    },

    // --- 旅遊主題專業插畫 (Travel Illustration) ---
    {
        id: "travel-paris",
        title: "巴黎街頭",
        category: "旅遊主題專業插畫",
        prompt: "巴黎街頭的浪漫插畫，艾菲爾鐵塔在遠處，路邊咖啡館，手繪水彩風格，溫暖色調。",
        description: "浪漫的巴黎旅遊插畫。",
        tags: ["旅遊", "巴黎", "插畫"],
        image: "/images/travel-paris.png"
    },
    {
        id: "travel-kyoto",
        title: "京都古韻",
        category: "旅遊主題專業插畫",
        prompt: "京都古老街道的插畫，穿著和服的行人，紅色鳥居，櫻花飄落，扁平化設計風格。",
        description: "充滿日本風情的旅遊插畫。",
        tags: ["旅遊", "京都", "日本"],
        image: "/images/travel-kyoto.png"
    },
    {
        id: "travel-santorini",
        title: "聖托里尼",
        category: "旅遊主題專業插畫",
        prompt: "希臘聖托里尼島的插畫，藍頂白牆的建築，湛藍愛琴海，陽光明媚，向量藝術風格。",
        description: "清新的地中海風情插畫。",
        tags: ["旅遊", "希臘", "海島"],
        image: "/images/travel-santorini.png"
    },
    {
        id: "travel-newyork",
        title: "紐約活力",
        category: "旅遊主題專業插畫",
        prompt: "紐約時代廣場的繁華插畫，高樓大廈，黃色計程車，霓虹廣告牌，現代波普風格。",
        description: "充滿活力的城市旅遊插畫。",
        tags: ["旅遊", "紐約", "城市"],
        image: "/images/travel-newyork.png"
    },
    {
        id: "travel-camping",
        title: "山林露營",
        category: "旅遊主題專業插畫",
        prompt: "山林間露營的插畫，帳篷，篝火，星空，周圍是松樹林，溫馨治癒風格。",
        description: "親近自然的露營插畫。",
        tags: ["旅遊", "露營", "自然"],
        image: "/images/travel-camping.png"
    },
    {
        id: "travel-itinerary-map",
        title: "日本文青手繪行程圖",
        category: "旅遊主題專業插畫",
        prompt: "將文字行程表轉化為日本文青氣息、手繪水彩風格的資訊圖表式地圖。視覺風格：溫暖柔和的手繪水彩感，粉色系為主。版面設計：以時間軸為主線，由上至下排列。內容元素：時間標示、交通方式（飛機、JR）、景點與食物插畫。文字風格：手寫筆記感。加入一名女子旅行的模樣。圖片尺寸：5:4橫。",
        description: "將行程表轉化為精美的手繪水彩資訊圖表。",
        tags: ["旅遊", "地圖", "資訊圖表", "水彩", "日本"],
        image: "/images/travel-itinerary-map.png"
    },

    // --- 食譜 (Recipes) ---
    {
        id: "recipe-salad",
        title: "健康沙拉食譜",
        category: "食譜",
        prompt: "設計一張清新的健康沙拉食譜卡，包含食材插畫（生菜、番茄、酪梨），步驟說明，手繪風格，綠色調。",
        description: "清新健康的手繪食譜卡。",
        tags: ["食譜", "沙拉", "手繪", "健康"],
        image: "/images/recipe-salad.png"
    },
    {
        id: "recipe-steak",
        title: "完美煎牛排",
        category: "食譜",
        prompt: "煎牛排的步驟圖解，從選肉、調味到煎製的關鍵時刻，寫實風格插畫，標註時間和溫度。",
        description: "專業的牛排烹飪指南。",
        tags: ["食譜", "牛排", "烹飪", "教學"],
        image: "/images/recipe-steak.png"
    },
    {
        id: "recipe-cookies",
        title: "烘焙餅乾",
        category: "食譜",
        prompt: "巧克力餅乾的烘焙食譜，溫馨的插畫風格，展示麵團攪拌、烘烤過程和成品，暖色調。",
        description: "溫馨可愛的烘焙食譜。",
        tags: ["食譜", "烘焙", "餅乾", "甜點"],
        image: "/images/recipe-cookies.png"
    },
    {
        id: "recipe-cocktail",
        title: "雞尾酒調製",
        category: "食譜",
        prompt: "莫希托 (Mojito) 雞尾酒的調製指南，透明玻璃杯，薄荷葉，檸檬片，清涼的水彩風格。",
        description: "清涼消暑的雞尾酒酒單。",
        tags: ["食譜", "雞尾酒", "飲料", "水彩"],
        image: "/images/recipe-cocktail.png"
    }
];

export const categories = [
    "全部",
    "風格轉換",
    "攝影效果",
    "角色設計",
    "場景與環境",
    "產品設計",
    "美食攝影",
    "動物與生物",
    "抽象與概念",
    "圖像編輯",
    "旅遊主題專業插畫",
    "食譜"
];
