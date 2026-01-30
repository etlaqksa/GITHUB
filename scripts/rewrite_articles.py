import re, os, json, math, random, hashlib

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ARTICLES_PATH = os.path.join(ROOT, 'client', 'src', 'data', 'articles.ts')
BACKUP_PATH = os.path.join(ROOT, 'client', 'src', 'data', 'articles.backup_pre_rewrite.ts')

with open(ARTICLES_PATH, 'r', encoding='utf-8') as f:
    ts = f.read()

# --- extract objects safely (ignore strings and template literals) ---

def extract_article_objects(ts: str):
    start = ts.find('export const articles')
    if start == -1:
        raise RuntimeError('Cannot find export const articles')
    arr_start = ts.find('[', start)
    arr_end = ts.rfind('];')
    if arr_start == -1 or arr_end == -1:
        raise RuntimeError('Cannot locate articles array brackets')
    s = ts[arr_start + 1:arr_end]
    objs = []
    i = 0
    depth = 0
    in_single = in_double = in_back = False
    esc = False
    obj_start = None

    while i < len(s):
        ch = s[i]
        if esc:
            esc = False
            i += 1
            continue
        if ch == '\\':
            esc = True
            i += 1
            continue

        if in_back:
            if ch == '`':
                in_back = False
            i += 1
            continue
        if in_single:
            if ch == "'":
                in_single = False
            i += 1
            continue
        if in_double:
            if ch == '"':
                in_double = False
            i += 1
            continue

        if ch == '`':
            in_back = True
            i += 1
            continue
        if ch == "'":
            in_single = True
            i += 1
            continue
        if ch == '"':
            in_double = True
            i += 1
            continue

        if ch == '{':
            if depth == 0:
                obj_start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and obj_start is not None:
                objs.append(s[obj_start:i + 1])
                obj_start = None
        i += 1

    return objs


def parse_field(obj: str, field: str):
    m = re.search(rf"{re.escape(field)}\s*:\s*'([^']*)'", obj)
    if m:
        return m.group(1)
    m = re.search(rf"{re.escape(field)}\s*:\s*`([^`]*)`", obj)
    if m:
        return m.group(1)
    return None


def seed_from_slug(slug: str) -> int:
    return int(hashlib.md5(slug.encode('utf-8')).hexdigest()[:8], 16)


arabic_openers = [
    "كثير من ملاك المباني يلاحظون علامة صغيرة ثم يتساءلون: هل الموضوع بسيط أم مؤشر على مشكلة تحت السطح؟",
    "تبدأ القصة غالبًا بسؤال واحد: لماذا ظهر هذا الأثر الآن، وما الذي تغيّر في التربة أو المياه أو الأحمال؟",
    "في مشاريع كثيرة داخل المدن، المشكلة ليست في عنصر واحد بل في سلسلة عوامل تتفاعل مع الزمن.",
    "عندما تبحث عن حلّ لمشكلة تحت الأساسات، ستجد مصطلحات كثيرة—لكن المهم هو فهم المعنى العملي لكل مصطلح.",
    "قد تسمع توصيات مختلفة من أكثر من طرف؛ لذلك يفيد أن نفهم الفكرة هندسيًا بلغة سهلة قبل اتخاذ قرار مكلف.",
]

arabic_tones = [
    "بأسلوب مبسط",
    "بلغة قريبة من العميل",
    "مع الحفاظ على الدقة الهندسية",
    "بدون تعقيد زائد",
    "مع أمثلة واقعية من بيئة البناء",
]

eng_openers = [
    "Most site problems start with a small sign—then the question becomes: is it cosmetic, or a subsurface indicator?",
    "Clients often ask for a quick fix, but the right answer begins with understanding the mechanism, not the material name.",
    "In many urban projects, the issue is not one factor; it is a chain of soil, water, and load interactions over time.",
    "Before choosing any ground treatment, it helps to translate technical terms into simple decision logic.",
    "This topic matters because it turns scattered observations into a coherent, low-risk decision.",
]

cta_ar = [
    "إذا تحب نساعدك بخطوة تشخيص واضحة، تقدر تبدأ من صفحة",
    "لو عندك حالة مشابهة وتحتاج قرار سريع، راجع",
    "للاطلاع على خدماتنا المرتبطة بهذا الموضوع، شوف",
    "لو تحب تربط المقال بحالتك في الموقع، تقدر تبدأ من",
]

cta_en = [
    "If you want a clear next step for your site, start from",
    "For a quick, decision‑friendly path, see",
    "To connect this topic to our services, visit",
    "If you want to translate this into a practical plan, begin with",
]

service_links = {
    'grouting': ('/services/grouting', 'حقن التربة', 'Soil Grouting'),
    'cavity': ('/services/cavity', 'كشف التكهفات', 'Cavity Detection'),
    'geophysical': ('/services/geophysical', 'الدراسات الجيوفيزيائية', 'Geophysical Surveys'),
}


def detect_theme(slug: str, title: str, cat: str) -> str:
    s = (slug + ' ' + title + ' ' + cat).lower()
    if any(k in s for k in ['gpr', 'radar', 'geophys', 'ert', 'seismic', 'geophysical', 'جيوفي', 'رادار', 'مقاومة كهرب', 'تصوير']):
        return 'geophysical'
    if any(k in s for k in ['cavity', 'void', 'sinkhole', 'karst', 'تجويف', 'تكهف', 'تكهفات', 'كارست', 'فراغ', 'هبوط فجائي']):
        return 'cavity'
    if any(k in s for k in ['crack', 'تشق', 'شقوق', 'cracks']):
        return 'cracks'
    if any(k in s for k in ['settlement', 'هبوط', 'differential', 'settle']):
        return 'settlement'
    if any(k in s for k in ['foundation', 'raft', 'pile', 'أساس', 'لبشة', 'خوازيق']):
        return 'foundation'
    if any(k in s for k in ['water', 'leak', 'moist', 'مياه', 'تسرب', 'رطوبة', 'خزان']):
        return 'water'
    if any(k in s for k in ['monitor', 'maintenance', 'مراقبة', 'صيانة', 'instrumentation']):
        return 'monitoring'
    if any(k in s for k in ['resin', 'polyurethane', 'urethane', 'راتنج', 'بوليمر', 'يوريثان']):
        return 'resin'
    if any(k in s for k in ['cement', 'microfine', 'أسمنت', 'ملاط', 'ميكروفاين']):
        return 'cement'
    if any(k in s for k in ['soil', 'تربة', 'grout', 'حقن']):
        return 'grouting'
    return 'general'


arabic_stop = set([
    'ما', 'هو', 'في', 'من', 'على', 'إلى', 'عن', 'كيف', 'لماذا', 'دليل', 'مقدمة', 'شرح', 'عملي', 'خطوة', 'حالة',
    'مع', 'بين', 'بدون', 'و', 'أو', 'أن', 'هذا', 'هذه', 'ذلك', 'عند', 'قبل', 'بعد', 'أثناء', 'تحت', 'وفق',
    'متى', 'إرشادي', 'مبسّط', 'بسيط', 'سريعة', 'شامل', 'المقال', 'موضوع', 'معايير', 'أفضل', 'الأخطاء', 'تنفيذ',
    'المراقبة', 'الصيانة', 'مؤشرات', 'حدود'
])

def extract_keywords_ar(title: str, maxn=3):
    words = re.split(r"[^\u0600-\u06FFA-Za-z0-9]+", title)
    words = [w for w in words if w and w not in arabic_stop and len(w) > 2]
    out = []
    for w in words:
        if w not in out:
            out.append(w)
        if len(out) >= maxn:
            break
    return out

eng_stop = set('what is a an the and or to of for in on under over guide how why with without practical decision oriented'.split())

def extract_keywords_en(title: str, maxn=3):
    words = re.split(r"[^A-Za-z0-9]+", title.lower())
    words = [w for w in words if w and w not in eng_stop and len(w) > 3]
    out = []
    for w in words:
        w2 = w.capitalize()
        if w2 not in out:
            out.append(w2)
        if len(out) >= maxn:
            break
    return out


def make_focus_paragraph_ar(item, rnd, theme):
    kws = extract_keywords_ar(item['title'])
    if not kws:
        kws = [item['category']]
    templates = [
        "محور هذا المقال هو فهم {k1} في الواقع، ثم ربطه بما يحدث تحت السطح. سنوضح أيضًا أين تظهر الحدود، ومتى يكون الانتقال إلى خطوة فحص إضافية أكثر أمانًا.",
        "سنركز هنا على {k1}{k2} كفكرة قرار: ما الذي يعنيه لك كمالك أو مطور، وكيف تقرأ العلامات حوله بدون مبالغة أو تهوين.",
        "الهدف من هذا المقال أن يجعل {k1}{k2}{k3} مفهومًا عند غير المتخصص، مع أمثلة تساعدك تميّز بين سيناريو «مشكلة سطحية» وسيناريو «مشكلة جيوتقنية».",
        "في السطور التالية سنحوّل {k1}{k2} إلى خطوات تفكير بسيطة: ما الذي تسأل عنه، وما الذي تقيسه، وكيف تربط النتيجة بالخدمة المناسبة.",
    ]
    t = rnd.choice(templates)
    k1 = kws[0]
    k2 = (" و" + kws[1]) if len(kws) > 1 else ""
    k3 = (" و" + kws[2]) if len(kws) > 2 else ""
    return t.format(k1=k1, k2=k2, k3=k3)


def make_focus_paragraph_en(item, rnd, theme):
    kws = extract_keywords_en(item['titleEn'])
    if not kws:
        kws = [item['categoryEn']]
    templates = [
        "This article focuses on {k1} and turns it into simple decision logic: what to ask, what to observe, and how to choose the safest next step.",
        "Our focus is {k1}{k2}: what it means for owners and developers, how it shows up on site, and when a verification step is worth the cost.",
        "We translate {k1}{k2}{k3} into a readable story—linking symptoms to subsurface mechanisms and clarifying the practical boundaries of each option.",
        "You will see {k1}{k2} explained with real‑world context, so the term becomes actionable rather than just a headline.",
    ]
    t = rnd.choice(templates)
    k1 = kws[0]
    k2 = (", " + kws[1]) if len(kws) > 1 else ""
    k3 = (", " + kws[2]) if len(kws) > 2 else ""
    return t.format(k1=k1, k2=k2, k3=k3)


# theme paragraphs

theme_key_paras = {
    'grouting': [
        "الفكرة الأساسية في حقن التربة ليست «ملء الفراغات» فقط، بل تغيير خاصية محددة تحت الأساس: تقليل نفاذية، رفع مقاومة قص، أو تقليل قابلية الانضغاط. عندما نفهم أي خاصية نريد تحسينها، يصبح اختيار مادة الحقن وطريقة توزيعها قرارًا منطقيًا بدل أن يكون تجربة.",
        "أكثر ما يربك العملاء أن نتائج الحقن لا تُقاس بالكمية وحدها. أحيانًا تُحقن كميات كبيرة لأن المادة وجدت مسارًا سهلاً، بينما التحسن الحقيقي يحدث عندما تصل المعالجة إلى المنطقة التي تتحكم في التشوه. لذلك نربط دائمًا بين «مكان التأثير» وبين أعراض الموقع مثل نمط الشقوق أو تاريخ التسرب.",
        "الحقن يتعامل مع ما تحت السطح، لكن قراره يبدأ من السطح: أين المشكلة؟ كيف تتغير؟ وما الذي يغذيها؟ هذه الأسئلة تجعل الحقن خطوة محسوبة بدل أن يكون محاولة عامة.",
    ],
    'cavity': [
        "التكهفات والفراغات تحت السطح ليست كلها بنفس الخطورة. فراغ صغير ثابت قد لا يسبب مشكلة، بينما فراغ مرتبط بمسار مياه متجدد قد يتوسع بسرعة. لذلك يبدأ الفهم من سؤالين: هل هناك تغذية مستمرة بالماء؟ وهل الفراغ قريب من مسار الأحمال تحت الأساس؟",
        "العميل غالبًا يريد جوابًا واحدًا: «هل يوجد فراغ أم لا؟». لكن القرار الأفضل يحتاج أيضًا تقدير الحجم النسبي ومكانه واحتمالية تطوره. هنا تأتي قيمة الربط بين الفحص الجيوفيزيائي/الاستكشاف وبين قراءة الأعراض على السطح.",
        "في كثير من الحالات، التحكم في السبب (مثل مسار ماء) يساوي في الأهمية معالجة الفراغ نفسه. فهم الآلية يحميك من عودة المشكلة بعد فترة.",
    ],
    'geophysical': [
        "الدراسات الجيوفيزيائية تساعدنا على رؤية ما تحت السطح بدون تكسير أو حفر واسع. لكنها ليست «سحرًا» يعطي صورة كاملة؛ هي أدوات تقيس خصائص فيزيائية (مثل المقاومة الكهربائية أو انعكاس الموجات) ثم نترجمها إلى احتمال وجود طبقة رخوة أو فراغ أو تغير رطوبة.",
        "أهم ما يميز الدراسة الجيدة أنها تجيب عن سؤال محدد مسبقًا. عندما يكون السؤال واضحًا—مثلاً تحديد مناطق احتمالية التكهف أو متابعة تسرب—نختار التقنية المناسبة ونبني خريطة تساعد القرار بدل تقرير عام.",
        "القيمة الحقيقية للمسح أنه يقلل نقاط الحفر العشوائي، ويختصر الوقت، ويزيد نسبة العثور على المنطقة الحرجة عند التحقق المباشر.",
    ],
    'settlement': [
        "الهبوط يحدث عندما تنضغط التربة أو تتغير رطوبتها أو تتأثر طبقة ضعيفة تحت الأحمال. المشكلة التي تقلق المالك ليست رقم الهبوط فقط، بل «الهبوط التفاضلي» الذي يسبب تشققات وميلان. لذلك نركز على أين يحدث الهبوط وما الذي يميّزه عن هبوط طبيعي متدرج.",
        "تفسير الهبوط يشبه قراءة قصة زمنية: متى بدأ؟ هل تزامن مع تسرب أو أعمال قريبة؟ هل يتسارع أم يتباطأ؟ هذه الأسئلة تجعلنا نميّز بين سبب تربة/ماء وسبب إنشائي، وتقلل احتمال اختيار علاج غير مناسب.",
        "عندما يتضح أن الآلية تحت السطح، يمكن حينها التفكير في تقوية/سد مسار أو معالجة طبقة ضعيفة بدل معالجة أثر الشقوق فقط.",
    ],
    'cracks': [
        "التشققات ليست دائمًا دليلًا على خطر كبير، لكنها «لغة» يرسلها المبنى. اتجاه الشق ومكانه وسماكته وزمن ظهوره تساعد على فهم ما إذا كان السبب هبوطًا تفاضليًا، تمددًا حراريًا، أو حركة في العناصر الإنشائية.",
        "الأهم للعميل أن يعرف ماذا يعني هذا الشق بالنسبة للقيمة والسلامة. لذلك نجمع بين وصف الشقوق وبين فهم سلوك التربة والمياه تحت الأساس: لأن نفس الشق قد يكون بسيطًا في حالة، ومؤشرًا مبكرًا في حالة أخرى.",
        "قراءة الشقوق مع الزمن (هل يزيد أم يثبت؟) غالبًا أهم من قراءة شكله في يوم واحد.",
    ],
    'foundation': [
        "أي حديث عن تحسين تحت الأساسات يبدأ من نوع الأساس وسلوك الحمل: اللبشة توزع الحمل على مساحة كبيرة لكنها تتأثر بالهبوط التفاضلي، بينما الخوازيق تتأثر بتغير طبقات التحمل والاحتكاك. فهم هذا يحدد أين نبحث عن المشكلة وأين نركز المعالجة.",
        "كثير من القرارات الخاطئة تأتي من علاج الأثر بدل السبب: تقوية جزء بعيد عن مسار الحمل، أو معالجة طبقة ليست هي المتحكم الرئيسي. لذلك نربط دائمًا بين مخطط الأساسات وبين طبقات التربة وتاريخ الموقع.",
        "عندما يتضح مسار الحمل، يصبح تحديد نطاق المعالجة أكثر دقة ويقل الهدر.",
    ],
    'water': [
        "الماء قد يغير سلوك التربة بسرعة: يزيد احتمال الهبوط في طبقات معينة، ويغذي مسارات قد تُشكّل فراغات، ويضعف قدرة التحمل حول الخزانات أو الشبكات. لذلك يصبح السؤال الأول: هل ما يحدث الآن مرتبط بتغير في الرطوبة أو تسرب؟",
        "ليس كل تسرب يؤدي إلى نفس النتيجة. التسرب المستمر في مسار واحد قد يحفر تحت السطح، بينما تسرب قصير قد يترك أثرًا محدودًا. ربط زمن التسرب بالأعراض هو ما يحول التخمين إلى تشخيص.",
        "غالبًا ما يكون حل مسار الماء جزءًا أساسيًا من الحل—حتى لو تم حقن التربة لاحقًا.",
    ],
    'monitoring': [
        "المراقبة ليست رفاهية؛ هي الطريقة التي تمنحك «اتجاه» بدل صورة لحظية. عندما نقيس مؤشرات بسيطة (تغير شق، منسوب، ميلان) بانتظام، نستطيع التمييز بين مشكلة مستقرة ومشكلة تتطور.",
        "الخطأ الشائع هو الاعتماد على قراءة واحدة أو صورة واحدة. الاتجاه عبر الوقت يوضح كثيرًا: هل التحسن مستمر؟ هل يوجد تذبذب مرتبط بالأمطار أو تشغيل خزان؟ هذه الأسئلة تقلل مخاطرة قرار متسرع.",
        "حتى بعد أي معالجة، المراقبة تعطيك ثقة بأن الوضع يستقر بالفعل.",
    ],
    'resin': [
        "الحقن بالراتنجات (مثل بعض أنواع البوليمر) يُستخدم عندما نحتاج استجابة سريعة أو عندما يكون الهدف رفع/تثبيت موضعي. لكنه ليس بديلًا لكل الحالات؛ فنجاحه يعتمد على مسار الانتشار وحساسية التربة للرطوبة والضغط.",
        "المالك يهتم عادة بالنتيجة المرئية: استقرار البلاط أو تقليل الشقوق. لكن القرار الصحيح يحتاج فهم حدود المادة: أين تنجح، وأين نحتاج حلًا مختلفًا مثل الحقن الإسمنتي أو معالجة مسار المياه.",
        "عندما تكون المشكلة نشطة بسبب ماء أو طبقة رخوة ممتدة، قد لا يكفي التثبيت الموضعي وحده.",
    ],
    'cement': [
        "الحقن الإسمنتي من أكثر الحلول شيوعًا لأن مادته متاحة ويمكن ضبطها بخلطات مختلفة. لكن قابلية دخوله في التربة ليست مطلقة: تدرج الحبيبات وحجم المسام يحددان هل ينتشر أم يترشح عند المدخل.",
        "لذلك، حين تسمع «أسمنت» لا تتخيل مادة واحدة. هناك نطاق واسع من الخلطات والإضافات، ولكل منها سلوك مختلف في السيولة والاستقرار والانفصال. اختيار الخلطة جزء من الفهم وليس إجراءً ثابتًا.",
        "المهم للعميل هو أن الخلطة تُختار لتخدم الهدف (سد مسار/تقوية طبقة) وليس لأنها «شائعة» فقط.",
    ],
    'general': [
        "هذا الموضوع يساعدك على ربط المصطلحات الفنية بما يهمك كعميل: استقرار المبنى، تقليل المخاطر، وتجنّب قرارات مكلفة بدون داع.",
        "نحاول هنا تبسيط الفكرة مع الحفاظ على الدقة: ما الذي يحدث تحت السطح، ولماذا يظهر على شكل شق أو هبوط أو تسرب، وكيف نختار المسار الصحيح للتعامل معه.",
        "التركيز سيكون على فهم الآلية، لأن الآلية هي ما يحدد العلاج الأنسب.",
    ],
}


def build_content(title: str, paragraphs):
    parts = [f"# {title}"] + paragraphs
    return "\n\n".join(parts) + "\n"


def escape_template(s: str) -> str:
    # keep markdown simple, avoid backslashes and template interpolation
    s = s.replace('\\', '')
    s = s.replace('${', '\\${')
    s = s.replace('`', "'")
    return s


def estimate_minutes(words: int, wpm: int) -> int:
    return max(4, int(math.ceil(words / float(wpm))))


def make_faq_ar(item, theme, rnd):
    kws = extract_keywords_ar(item['title'])
    k = kws[0] if kws else item['category']
    q_templates = [
        (f"هل {k} يعني بالضرورة وجود خطر كبير؟",
         "ليس بالضرورة. الأهم هو اتجاه المؤشر مع الزمن وارتباطه بأحداث مثل تسرب أو أعمال مجاورة. أحيانًا يكون الأثر ثابتًا وغير متطور، وأحيانًا يكون مؤشرًا مبكرًا يحتاج فحصًا موجّهًا."),
        ("متى أحتاج خطوة فحص قبل أي معالجة؟",
         "إذا كانت الأعراض متغيرة أو لديك أكثر من مؤشر في نفس الوقت (مثل شقوق مع رطوبة أو هبوط)، أو إذا كانت قيمة المبنى/المخاطر عالية، فالفحص الموجّه يقلل احتمالية اختيار علاج غير مناسب."),
        ("ما الخطوة العملية الأولى التي تنصحون بها؟",
         "ابدأ بجمع معلومات بسيطة: صور بتاريخ، قياس عرض الشق إن وجد، تحديد وجود تسرب، ووصف المكان بدقة. بعدها يمكن اختيار مسار سريع: مسح/كشف، أو تقييم مبدئي ثم قرار معالجة."),
    ]
    return [{"question": q, "answer": a} for q, a in q_templates]


def make_faq_en(item, theme, rnd):
    kws = extract_keywords_en(item['titleEn'])
    k = kws[0] if kws else item['categoryEn']
    q_templates = [
        (f"Does {k} automatically mean high risk?",
         "Not always. What matters is the trend over time and whether it correlates with triggers like leakage or nearby works. Some signs are stable; others are early indicators that deserve targeted verification."),
        ("When should I verify before choosing treatment?",
         "If symptoms are changing, if multiple indicators appear together (cracks + moisture + settlement), or if the asset risk is high, a focused verification step reduces the chance of a mismatched solution."),
        ("What is the first practical step you recommend?",
         "Collect simple evidence: dated photos, basic measurements (e.g., crack width), leakage checks, and accurate location notes. Then choose a low‑risk path: targeted survey/detection or an initial assessment that leads to a clear decision."),
    ]
    return [{"question": q, "answer": a} for q, a in q_templates]


def make_paragraphs_ar(item):
    rnd = random.Random(seed_from_slug(item['slug']))
    theme = detect_theme(item['slug'], item['title'], item['category'])
    opener = rnd.choice(arabic_openers)
    tone = rnd.choice(arabic_tones)

    p1 = (
        f"{opener} في هذا الموضوع نشرح «{item['title']}» {tone}، "
        "ونربط بين ما تراه على السطح وبين ما قد يحدث في التربة أو الصخور تحت الأساسات. "
        "الفكرة ليست أن نحفظ مصطلحات، بل أن نفهم كيف نختصر الطريق إلى قرار صحيح بأقل مخاطرة."
    )

    p2 = make_focus_paragraph_ar(item, rnd, theme)

    base = theme_key_paras.get(theme, theme_key_paras['general'])
    p3 = rnd.choice(base) + " إذا كنت تسمع آراء متباينة من أكثر من مقاول أو مكتب، فغالبًا السبب أن كل طرف يفترض آلية مختلفة للمشكلة."
    p4 = rnd.choice(base) + " وهنا تظهر قيمة جمع «قصة الموقع» كاملة: نوع الأساس، تاريخ تسربات المياه، أعمال مجاورة، وأي تغيير حديث في الأحمال أو الاستخدام."

    obs_map = {
        'cavity': "من العلامات التي تهمك كعميل: هبوط موضعي مفاجئ في جزء محدد، صوت أجوف عند الطرق على البلاط، أو تكرار انهيار بسيط حول غرف التفتيش. هذه العلامات لا تؤكد وجود فراغ، لكنها ترفع احتمال سيناريو التكهف وتستحق فحصًا موجّهًا.",
        'geophysical': "قد تتساءل: لماذا لا نحفر مباشرة؟ أحيانًا لأن الحفر العشوائي قد يفوّت المكان الحرج. المسح الجيوفيزيائي يساعد على رسم خريطة احتمالات ثم نختار أقل عدد من نقاط التحقق المباشر، وهذا يقلل التكلفة ويزيد الدقة.",
        'settlement': "الهبوط التفاضلي يظهر غالبًا على شكل شقوق حول الفتحات أو عند التقاء عناصر مختلفة، أو على شكل ميلان بسيط في الأرضيات. المهم هنا ليس شكل الشق وحده، بل تزامنه مع حدث: تسرب، أمطار غزيرة، أو أعمال حفر قريبة.",
        'cracks': "التشققات التي تستحق الانتباه عادة هي التي تتطور مع الزمن أو ترتبط بباب لا يغلق أو أرضية تميل. أما الشقوق الشعرية الثابتة فقد تكون انكماشية. التمييز بينهما يوفر عليك قرارات علاج غير لازمة.",
        'water': "إذا كان هناك تسرب أو تغير في الرطوبة، فالأسئلة التي تهمك: هل التسرب مستمر؟ من أين يغذي التربة؟ وهل ظهرت الأعراض بعده مباشرة أم بعد فترة؟ ربط الزمن بالملاحظة هو مفتاح التشخيص.",
        'foundation': "في اللبشة، أي ضعف موضعي قد ينعكس على منطقة أوسع بسبب توزيع الأحمال. وفي الخوازيق، قد تكون المشكلة في طبقة التحمل أو في الاحتكاك الجانبي. لذلك لا يوجد «علاج واحد» قبل فهم مسار الحمل.",
        'resin': "المواد البوليمرية قد تعطي نتيجة سريعة في التثبيت الموضعي، لكن الأهم هو التأكد أنها تعالج الآلية وليس العرض فقط. في بعض الحالات يكون التحكم في مسار الماء أو معالجة طبقة ضعيفة أولى من أي رفع موضعي.",
        'cement': "الحقن الإسمنتي ينجح عندما تكون التربة قابلة لاختراق الملاط أو عندما نحتاج تقليل نفاذية عبر سد مسارات محددة. لكن في تربة دقيقة جدًا قد نحتاج خلطات أدق أو مسار مختلف للمعالجة.",
        'grouting': "إذا كانت المشكلة «تحت الأساس»، فالهدف غالبًا أحد ثلاثة: تقليل نفاذية مسار ماء، زيادة صلابة طبقة ضعيفة، أو معالجة فراغات/تفكك. تحديد الهدف من البداية يختصر الطريق إلى الحل الصحيح.",
    }
    p5 = obs_map.get(theme, obs_map['grouting'])

    p6 = rnd.choice([
        "مثال سريع: مبنى سكني ظهرت به تشققات بعد تسرب من خزان. في هذه الحالة قد لا يكون السبب «ضعف تربة قديم»، بل تغير رطوبة وتغذية مسار ماء. القرار الأفضل يبدأ بتحديد مسار التسرب ثم تقدير أثره قبل أي تدخل علاجي واسع.",
        "مثال شائع في المدن: هبوط بسيط قرب رصيف أو ساحة بسبب أعمال خدمات تحت الأرض. هنا قد يكون الخطر موضعيًا، وإجراء كشف موجّه أو حقن محدود في المنطقة الحرجة قد يكون كافيًا بدل علاج شامل للموقع كله.",
        "في بعض الحالات يظهر هبوط موضعي في غرفة أو ممر بينما بقية المبنى مستقرة. هذا النمط يدعم فرضية مشكلة موضعية مثل فراغ أو طبقة رخوة محددة، ويغيّر طريقة الفحص والمعالجة عن حالة هبوط عام.",
    ])

    p7 = rnd.choice([
        "عمليًا، أفضل طريقة للتعامل هي تحويل الملاحظة إلى أسئلة: متى بدأت؟ هل تتكرر؟ هل ترتبط بمياه أو أحمال جديدة؟ ثم نختار أقل خطوة تحقق تقلل عدم اليقين—مثل مسح سريع، أو نقطة تحقق مباشرة في مكان ذكي.",
        "بدل البحث عن «حل واحد لكل شيء»، قسّم المشكلة: هل هي موضعية أم ممتدة؟ هل تتسارع أم ثابتة؟ وهل يوجد عامل خارجي واضح مثل تسرب أو أعمال مجاورة؟ هذه الأسئلة تمنعنا من علاج خاطئ.",
        "إذا كان عندك أكثر من مؤشر (شق + رطوبة + هبوط بسيط)، فالقرار الجيد يجمع هذه الإشارات ولا يعالج كل واحدة منفصلة. الهدف هو فهم الآلية المسيطرة ثم اختيار تدخل واحد يخدمها ويقلل المخاطر.",
        "العميل الذكي لا يطارد الأرقام وحدها؛ يطارد الاتجاه. إذا كانت المؤشرات تتغير مع الزمن، فهذا يعطيك أولويات واضحة: أين تركز الفحص، وأين قد تكفي متابعة دورية قبل أي أعمال.",
    ])

    primary = 'grouting'
    if theme == 'cavity':
        primary = 'cavity'
    elif theme == 'geophysical':
        primary = 'geophysical'

    href_ar, name_ar, _ = service_links[primary]
    extras = [k for k in ['geophysical', 'cavity'] if k != primary]
    rnd.shuffle(extras)
    secondary_key = extras[0] if extras else None
    links = [f"[{name_ar}]({href_ar})"]
    if secondary_key:
        h, n_ar, _ = service_links[secondary_key]
        links.append(f"[{n_ar}]({h})")
    links_str = "، ".join(links)

    p8 = (
        f"{rnd.choice(cta_ar)} {links_str}. "
        "داخل الموقع ستجد أيضًا صفحات مدن وخدمات تساعدك تربط الفكرة بموقعك الفعلي، مثل صفحات الرياض وجدة والدمام."
    )

    p9 = rnd.choice([
        "إذا رغبت بالقراءة من مصادر موثوقة، ابحث عن FHWA (Ground Improvement) ومعيار EN 12715 (Grouting) كمدخل عام، ثم طبّق المنطق على حالة موقعك.",
        "للتوسع، توجد مراجع دولية مثل FHWA GEC‑13 وEN 12715 تشرح الإطار العام، لكنها لا تغني عن فهم ظروف موقعك وتاريخ المشكلة.",
        "لمن يريد مرجعًا أعمق، ابحث عن أدلة FHWA في تحسين التربة ومعيار EN 12715 للأعمال الجيوتقنية الخاصة—ستجد مبادئ تساعد على التفكير الصحيح.",
    ]) + " نحن في ETLAQ نترجم هذه المبادئ إلى قرار عملي يناسب ظروف الموقع داخل المملكة."

    p10 = rnd.choice([
        "في مشاريع المملكة، قد تلعب الردميات، ومسارات الخدمات، ودورات الرطوبة دورًا أكبر مما نتوقع. لذلك نركز دائمًا على «قصة الموقع» قبل اختيار أي معالجة.",
        "اختلاف بيئات المدن (رياض/جدة/الدمام) يجعل القراءة العامة مفيدة، لكن القرار النهائي يجب أن يكون مرتبطًا ببيانات موقعك. هذا هو الفرق بين حل مؤقت وحل مستدام.",
        "النتيجة الأفضل تتحقق عندما يكون التشخيص واضحًا والخطوة التالية محددة. المقال يعطيك منطق القرار، والفحص الميداني يؤكد التفاصيل.",
    ])

    return [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]



def make_paragraphs_en(item):
    rnd = random.Random(seed_from_slug(item['slug']) + 7)
    theme = detect_theme(item['slug'], item['titleEn'], item['categoryEn'])
    opener = rnd.choice(eng_openers)

    p1 = (
        f"{opener} In this article, we explain “{item['titleEn']}” in plain, client‑friendly language "
        "while keeping engineering accuracy. The aim is not to overload you with terms, but to help you reach a safe decision with less uncertainty."
    )

    p2 = make_focus_paragraph_en(item, rnd, theme)

    en_bases = {
        'grouting': [
            "Soil grouting is not only about “filling gaps.” The real goal is to change a specific property under a foundation: reduce permeability, improve stiffness, or limit compressibility. Once the target property is clear, material selection and execution logic become consistent and measurable.",
            "Many clients assume that more injected volume means better improvement. In reality, large volumes can follow easy pathways and miss the controlling zone. True benefit appears when treatment reaches the layer or pocket that drives settlement and cracking—and then stabilizes it.",
            "Grouting decisions start at the surface: where is the symptom, how does it evolve, and what feeds it? That makes treatment a calculated step, not a generic attempt.",
        ],
        'cavity': [
            "Not every void is equally dangerous. A small, stable pocket may remain harmless, while a void connected to an active water path can grow rapidly. Two questions matter: is there ongoing water feeding the void, and is the void under a key load path?",
            "Clients often want a simple yes/no answer—“is there a void?”—but a good decision also considers depth, relative size, and whether the mechanism is active. That’s why we connect results to symptoms and site history.",
            "In many cases, controlling the driver (like a water pathway) is as important as treating the void itself—otherwise the problem can return.",
        ],
        'geophysical': [
            "Geophysical surveys help identify subsurface patterns without wide demolition or random drilling. They do not produce literal photographs; they measure physical properties and we interpret them as probability of moisture change, weak zones, or voiding.",
            "A strong survey starts with a clear question. If the objective is defined—prioritize suspected cavities, map moisture pathways, or outline weak layers—then interpretation becomes focused and useful for scope and risk decisions.",
            "The real value is fewer blind verification points and higher confidence that drilling or treatment targets the critical zone.",
        ],
        'settlement': [
            "Settlement occurs when soil compresses, moisture conditions change, or a weak layer is overstressed. Owners are usually concerned less about a single value and more about differential settlement that causes cracks, doors sticking, and floor tilt.",
            "Think of settlement as a time story: when did it start, what changed around that time, and is movement accelerating? These questions help separate soil/water mechanisms from structural or load‑change issues.",
            "Once the mechanism is confirmed below ground, the discussion can shift from patching cracks to stabilizing the controlling layer or pathway.",
        ],
        'cracks': [
            "Cracks are not always an emergency, but they are the building’s language. Direction, location, width, and timing help indicate whether the driver is differential settlement, thermal movement, or structural behavior.",
            "Owners care about what a crack means for safety and value. That is why we connect crack patterns to what might be happening below—soil stiffness, moisture pathways, and the foundation load path.",
            "Time evolution often matters more than a single photo. A stable crack and a growing crack point to different decisions.",
        ],
        'foundation': [
            "Any remediation decision should start with the foundation type and the load path. A raft spreads load but is sensitive to differential settlement; piles depend on bearing layers and shaft resistance. This guides where investigation and treatment actually matter.",
            "Many wrong choices come from treating symptoms, not causes—improving zones away from critical load paths or focusing on layers that do not control movement. Linking foundation layout with soil stratification is key.",
            "When the load path is clear, the treatment scope becomes sharper and waste is reduced.",
        ],
        'water': [
            "Water can change soil behavior quickly: it may increase settlement potential, feed pathways that evolve into voids, and weaken zones around tanks or utilities. The first question is simple: did moisture conditions change, or is there leakage?",
            "Not every leak produces the same outcome. A long‑term leak along one route can erode fines and create cavities, while a short event may leave limited impact. Timing and recurrence are crucial clues.",
            "Even when grouting is used, controlling water pathways is often part of long‑term stability.",
        ],
        'monitoring': [
            "Monitoring gives you trends instead of snapshots. By tracking simple indicators—crack width, floor levels, tilt—you can tell whether a problem is stable or developing.",
            "A common mistake is relying on one measurement. Trends reveal patterns: do changes correlate with rainfall, tank operation, or seasonal cycles? This reduces the risk of rushed interventions.",
            "After any treatment, monitoring is how you confirm stability rather than guessing.",
        ],
        'resin': [
            "Polymer/resin injection is used when a fast response or localized lifting/stabilization is needed. It is not universal; its success depends on spread pathways and soil sensitivity to moisture and confinement.",
            "Clients focus on visible results—stable flooring or reduced cracking—but good decisions also consider boundaries: where resin works well and where cementitious grouts or water‑path control make more sense.",
            "If the driver is an active water pathway or a widespread weak layer, localized lifting alone may not be enough.",
        ],
        'cement': [
            "Cementitious grouting is widely used because materials are available and mixes can be tuned. Yet groutability is not guaranteed: particle size distribution and pore size control whether grout penetrates or filters at entry.",
            "“Cement grout” is not a single product. Mix design and additives can change flow, stability, and segregation. Selecting the mix is part of understanding—not a fixed routine.",
            "For clients, the key is that the mix serves the goal (sealing a pathway, stiffening a layer), not that it is simply common.",
        ],
        'general': [
            "This topic translates technical terms into what clients care about: stability, risk reduction, and avoiding costly decisions made on assumptions.",
            "We keep the logic simple: what happens below ground, why it shows up as cracks/settlement/leakage, and how to choose the next step safely.",
            "Mechanism matters because it is the mechanism that selects the right tool.",
        ],
    }

    base = en_bases.get(theme, en_bases['general'])
    p3 = rnd.choice(base) + " If you have received different opinions, it is often because each opinion assumes a different mechanism—and therefore a different best tool."
    p4 = rnd.choice(base) + " A complete “site story” matters: foundation type, leakage history, nearby works, and any recent load or usage changes."

    obs_en_map = {
        'cavity': "Client‑relevant signs may include a sudden localized dip, a hollow sound under tiles, or repeated minor collapse near inspection chambers. These do not prove a void, but they increase its likelihood and justify targeted investigation.",
        'geophysical': "You may wonder: why not drill immediately? Random drilling can miss the critical spot. A survey builds a probability map first, then you validate with fewer, smarter verification points—often saving cost and improving confidence.",
        'settlement': "Differential settlement often appears around openings, at interfaces of different materials, or as subtle floor tilt. The key is not the crack shape alone, but whether it started after leakage, heavy rain, or nearby excavation.",
        'cracks': "Cracks that deserve attention are those that evolve with time or come with functional signs such as doors sticking or noticeable floor slope. Stable hairline shrinkage cracks are a different story.",
        'water': "If leakage or moisture change is suspected, focus on recurrence and timing: is it continuous, where does it feed the ground, and did symptoms appear right after or later? Time correlation is a powerful diagnostic tool.",
        'foundation': "With raft foundations, a localized weakness can affect a wider area through load redistribution. With piles, the issue may sit in bearing strata or shaft friction changes.",
        'resin': "Polymers can deliver quick local stabilization, but the key is whether they address the controlling mechanism. In some cases, controlling a water pathway is more important than localized lifting.",
        'cement': "Cementitious grouting works well when soil is groutable or when the goal is to reduce permeability by sealing pathways. In very fine soils, alternative mixes may be needed.",
        'grouting': "When the problem is “under the foundation,” the target is usually one of three: reduce a water pathway, stiffen a weak layer, or treat voids/loose pockets. Defining the target early keeps the solution coherent.",
    }
    p5 = obs_en_map.get(theme, obs_en_map['grouting'])

    p6 = rnd.choice([
        "Quick example: cracks started after a tank leak. The driver may be moisture change and a feeding pathway—not an old weakness. The safest decision maps the leakage route and its influence before committing to wide treatment.",
        "A common urban case: slight settlement near a sidewalk due to utility works. The risk can be localized, so targeted detection and limited treatment may be sufficient instead of a full‑site remedy.",
        "Sometimes movement is limited to one room while the rest stays stable. That pattern supports a localized mechanism such as a pocket void or a specific weak layer.",
    ])

    p7 = rnd.choice([
        "A practical way forward is to convert observations into questions: when did it start, does it repeat, is water involved, and did loads change? Then pick the smallest verification step that reduces uncertainty.",
        "Instead of searching for a universal fix, classify the problem: localized or widespread, stable or accelerating, with or without an external trigger. This prevents treating the wrong mechanism.",
        "When you have multiple signs (cracks + moisture + minor settlement), integrate them into one mechanism and one plan. Treating each sign separately often wastes time and money.",
        "Good decisions track trends rather than single numbers. If indicators evolve over time, you gain a clear map of where to investigate and where monitoring may be enough.",
    ])

    primary = 'grouting'
    if theme == 'cavity':
        primary = 'cavity'
    elif theme == 'geophysical':
        primary = 'geophysical'

    href, _, name_en = service_links[primary]
    extras = [k for k in ['geophysical', 'cavity'] if k != primary]
    rnd.shuffle(extras)
    secondary = extras[0] if extras else None

    links = [f"[{name_en}]({href})"]
    if secondary:
        h, _, n_en = service_links[secondary]
        links.append(f"[{n_en}]({h})")
    link_str = ", ".join(links)

    p8 = f"{rnd.choice(cta_en)} {link_str}. You can also reach us via [Contact](/contact) or start with a [Service Request](/request-service)."

    p9 = rnd.choice([
        "For credible references, search for FHWA guidance on ground improvement and EN 12715 (Special geotechnical work: Grouting). They provide structured thinking rather than a one‑size recipe.",
        "To go deeper, explore FHWA GEC‑13 and EN 12715. Use them as a framework, then tailor decisions to your site’s conditions and history.",
        "If you want a reliable starting point, FHWA (Ground Improvement) and EN 12715 (Grouting) are widely cited references.",
    ]) + " We translate that framework into practical, site‑ready decisions in KSA conditions."

    p10 = rnd.choice([
        "Across KSA cities, the same symptom can have different drivers: local fills, utility corridors, or moisture cycles. That is why we always tie the solution to the mechanism—not to the buzzword.",
        "Local conditions matter: water pathways, backfills, and site history can dominate outcomes. The best approach is the one that matches your site’s story—not someone else’s case.",
        "A durable result comes from a clear diagnosis and a focused next step. This article gives decision logic; site verification confirms the details.",
    ])

    return [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]


# --- parse items ---
objs = extract_article_objects(ts)
items = []
for obj in objs:
    idm = re.search(r"id\s*:\s*(\d+)", obj)
    slugm = re.search(r"slug\s*:\s*'([^']+)'", obj)
    if not idm or not slugm:
        continue
    item = {
        'id': int(idm.group(1)),
        'slug': slugm.group(1),
        'title': parse_field(obj, 'title') or '',
        'titleEn': parse_field(obj, 'titleEn') or '',
        'category': parse_field(obj, 'category') or '',
        'categoryEn': parse_field(obj, 'categoryEn') or '',
        'date': parse_field(obj, 'date') or '2026-01-01',
    }
    items.append(item)

items.sort(key=lambda x: x['id'])
if len(items) != 78:
    raise RuntimeError(f'Expected 78 articles, got {len(items)}')

# backup once
if not os.path.exists(BACKUP_PATH):
    with open(BACKUP_PATH, 'w', encoding='utf-8') as f:
        f.write(ts)

# --- write new TS ---

def json_dumps(v):
    return json.dumps(v, ensure_ascii=False)


def minutes_str_ar(m):
    return f"{m} دقائق"


def minutes_str_en(m):
    return f"{m} min"


out = []
out.append('export interface ArticleImage {')
out.append('  url: string;')
out.append('  alt: string;')
out.append('  creditName: string;')
out.append('  creditUrl: string;')
out.append('  license: string;')
out.append('}')
out.append('')
out.append('export interface FAQItem { question: string; answer: string; questionEn?: string; answerEn?: string; }')
out.append('')
out.append('export interface ArticleContent {')
out.append('  id: number;')
out.append('  title: string;')
out.append('  titleEn: string;')
out.append('  category: string;')
out.append('  categoryEn: string;')
out.append('  categoriesAr?: string[];')
out.append('  categoriesEn?: string[];')
out.append('  date: string;')
out.append('  readTime: string;')
out.append('  readTimeEn?: string;')
out.append('  author: string;')
out.append('  content: string;')
out.append('  contentEn: string;')
out.append('  slug: string;')
out.append('  faqAr?: { question: string; answer: string }[];')
out.append('  faqEn?: { question: string; answer: string }[];')
out.append('  image?: ArticleImage;')
out.append('  excerpt?: string;')
out.append('  excerptEn?: string;')
out.append('}')
out.append('')
out.append('export const articles: ArticleContent[] = [')

for it in items:
    theme = detect_theme(it['slug'], it['title'], it['category'])
    rnd = random.Random(seed_from_slug(it['slug']))
    paras_ar = make_paragraphs_ar(it)
    paras_en = make_paragraphs_en(it)

    content_ar = escape_template(build_content(it['title'], paras_ar))
    content_en = escape_template(build_content(it['titleEn'], paras_en))

    words_ar = len(' '.join(paras_ar).split())
    words_en = len(' '.join(paras_en).split())

    rt_ar = estimate_minutes(words_ar, 170)
    rt_en = estimate_minutes(words_en, 210)

    excerpt_ar = paras_ar[0]
    excerpt_en = paras_en[0]

    categories_ar = list(dict.fromkeys([it['category'], 'الهندسة الجيوتقنية', 'حقن التربة', 'موسوعة حقن التربة']))
    categories_en = list(dict.fromkeys([it['categoryEn'], 'Geotechnical Engineering', 'Soil Grouting', 'Ground Improvement Library']))

    faq_ar = make_faq_ar(it, theme, rnd)
    faq_en = make_faq_en(it, theme, rnd)

    out.append('  {')
    out.append(f"    id: {it['id']},")
    out.append(f"    title: {json_dumps(it['title'])},")
    out.append(f"    titleEn: {json_dumps(it['titleEn'])},")
    out.append(f"    category: {json_dumps(it['category'])},")
    out.append(f"    categoryEn: {json_dumps(it['categoryEn'])},")
    out.append(f"    categoriesAr: {json_dumps(categories_ar)},")
    out.append(f"    categoriesEn: {json_dumps(categories_en)},")
    out.append(f"    date: {json_dumps(it['date'])},")
    out.append(f"    readTime: {json_dumps(minutes_str_ar(rt_ar))},")
    out.append(f"    readTimeEn: {json_dumps(minutes_str_en(rt_en))},")
    out.append(f"    author: {json_dumps('فريق ETLAQ الهندسي')},")
    out.append(f"    slug: {json_dumps(it['slug'])},")
    out.append('    image: {')
    out.append(f"      url: {json_dumps('/article-images/hero/' + it['slug'] + '.svg')},")
    out.append(f"      alt: {json_dumps(it['title'])},")
    out.append(f"      creditName: {json_dumps('ETLAQ (generated)')},")
    out.append(f"      creditUrl: {json_dumps('')},")
    out.append(f"      license: {json_dumps('Internal')},")
    out.append('    },')
    out.append(f"    excerpt: {json_dumps(excerpt_ar)},")
    out.append(f"    excerptEn: {json_dumps(excerpt_en)},")
    out.append(f"    content: `{content_ar}`,")
    out.append(f"    contentEn: `{content_en}`,")
    out.append(f"    faqAr: {json_dumps(faq_ar)},")
    out.append(f"    faqEn: {json_dumps(faq_en)},")
    out.append('  },')

out.append('];')
out.append('')

with open(ARTICLES_PATH, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print('✅ Rewrote articles.ts with unique, readable long-form content (AR/EN).')
print('   Backup saved at:', os.path.relpath(BACKUP_PATH, ROOT))
