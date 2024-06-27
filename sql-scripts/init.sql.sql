--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10
-- Dumped by pg_dump version 14.10

-- Started on 2024-06-24 16:51:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 33332)
-- Name: citoyen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.citoyen (
    passeport character varying(255) NOT NULL,
    adresse character varying(255),
    codepostal character varying(255),
    gouvernerat character varying(255),
    nom character varying(255),
    nometab character varying(255),
    numtel bigint,
    pays character varying(255),
    prenom character varying(255),
    typeetab character varying(255),
    ville character varying(255),
    idinst integer
);


ALTER TABLE public.citoyen OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 33340)
-- Name: dates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dates (
    id bigint NOT NULL,
    daterdv date,
    maxrdv integer,
    idinst integer
);


ALTER TABLE public.dates OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 33339)
-- Name: dates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dates_id_seq OWNER TO postgres;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 210
-- Name: dates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dates_id_seq OWNED BY public.dates.id;


--
-- TOC entry 213 (class 1259 OID 33347)
-- Name: employe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employe (
    id_employe bigint NOT NULL,
    cin character varying(255),
    email character varying(255),
    nom character varying(255),
    password character varying(255),
    prenom character varying(255),
    statut character varying(255),
    username character varying(255),
    idinst integer,
    role_id_role integer
);


ALTER TABLE public.employe OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 33346)
-- Name: employe_id_employe_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employe_id_employe_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employe_id_employe_seq OWNER TO postgres;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 212
-- Name: employe_id_employe_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employe_id_employe_seq OWNED BY public.employe.id_employe;


--
-- TOC entry 215 (class 1259 OID 33356)
-- Name: institution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.institution (
    idinst integer NOT NULL,
    adresse character varying(255),
    codepostal character varying(255),
    gouvernerat character varying(255),
    nominst character varying(255),
    ville character varying(255)
);


ALTER TABLE public.institution OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 33355)
-- Name: institution_idinst_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.institution_idinst_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.institution_idinst_seq OWNER TO postgres;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 214
-- Name: institution_idinst_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.institution_idinst_seq OWNED BY public.institution.idinst;


--
-- TOC entry 217 (class 1259 OID 33365)
-- Name: rendezvous; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rendezvous (
    idrdv integer NOT NULL,
    daterdv date,
    datesaisie date,
    etat character varying(255),
    observations character varying(255),
    passeport character varying(255),
    id bigint
);


ALTER TABLE public.rendezvous OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 33364)
-- Name: rendezvous_idrdv_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rendezvous_idrdv_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rendezvous_idrdv_seq OWNER TO postgres;

--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 216
-- Name: rendezvous_idrdv_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rendezvous_idrdv_seq OWNED BY public.rendezvous.idrdv;


--
-- TOC entry 219 (class 1259 OID 33374)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id_role integer NOT NULL,
    role_name character varying(20)
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 33373)
-- Name: role_id_role_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_role_seq OWNER TO postgres;

--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 218
-- Name: role_id_role_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_role_seq OWNED BY public.role.id_role;


--
-- TOC entry 221 (class 1259 OID 33381)
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    idparam bigint NOT NULL,
    maxrdvg integer,
    idinst integer
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 33380)
-- Name: settings_idparam_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.settings_idparam_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.settings_idparam_seq OWNER TO postgres;

--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 220
-- Name: settings_idparam_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.settings_idparam_seq OWNED BY public.settings.idparam;


--
-- TOC entry 3193 (class 2604 OID 33343)
-- Name: dates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dates ALTER COLUMN id SET DEFAULT nextval('public.dates_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 33350)
-- Name: employe id_employe; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employe ALTER COLUMN id_employe SET DEFAULT nextval('public.employe_id_employe_seq'::regclass);


--
-- TOC entry 3195 (class 2604 OID 33359)
-- Name: institution idinst; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.institution ALTER COLUMN idinst SET DEFAULT nextval('public.institution_idinst_seq'::regclass);


--
-- TOC entry 3196 (class 2604 OID 33368)
-- Name: rendezvous idrdv; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rendezvous ALTER COLUMN idrdv SET DEFAULT nextval('public.rendezvous_idrdv_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 33377)
-- Name: role id_role; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id_role SET DEFAULT nextval('public.role_id_role_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 33384)
-- Name: settings idparam; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings ALTER COLUMN idparam SET DEFAULT nextval('public.settings_idparam_seq'::regclass);


--
-- TOC entry 3359 (class 0 OID 33332)
-- Dependencies: 209
-- Data for Name: citoyen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.citoyen (passeport, adresse, codepostal, gouvernerat, nom, nometab, numtel, pays, prenom, typeetab, ville, idinst) FROM stdin;
14505319	18 rue 6745 omrane supérieur	1091	ariana	chiheb	esprit	53090722	tunisie	souli	Privé	mnihla	\N
1455778	18 rue eskandareya	2054	ben arous	amine	iset 	53090777	tunisie	djobbi	Publique	mourouj	\N
145053177	18 rue 6745 omrane supérieur	1091	test	chiheb	test	53090722	tunisie	souli	Privé	mnihla	\N
14505322	18 rue 6745 omrane supérieur	1091	test	chiheb	6664yfgyfy	53090722	tunisie	souli	Privé	mnihla	\N
8484854	18 rue 6745 omrane supérieur	1091	ariana	chiheb	souli chiheb	53090722	tunisie	souli	Privé	mnihla	\N
88888888	18 rue 6745 omrane supérieur	1091	ariana	chiheb	souli chiheb	53090722	tunisie	souli	Privé	mnihla	\N
999999999	18 rue 6745 omrane supérieur	1091	test	chiheb	souli chiheb	53090722	Tunisie	souli	Publique	mnihla	\N
14505217	18 rue 6745 omrane supérieur	1091	ariana	chiheb	ESPRIT	53090722	Tunisie	souli	Privé	mnihla	\N
14505316	18 rue 6745 omrane supérieur	1091	ariana	chiheb	ESPRIT	53090722	Tunisie	souli	Privé	mnihla	\N
14505306	18 rue 6745 omrane supérieur	1091	ariana	chiheberger	souli ch	53090722	Tunisie	souli	Privé	mnihla	\N
5555	18 rue 6745 omrane supérieur	1091	dddd	chiheb	dddd	53090722	Tunisie	souli	Privé	mnihla	\N
14505388	18 rue 6745 omrane supérieur	1091	ariana	chiheb	souli ch	53090722	North Macedonia	souli	Privé	mnihla	\N
154154128455	18 rue 6745 omrane supérieur	1091	ariana	chiheb	souli ch	53090722	Samoa	souli	Publique	mnihla	\N
14505377	18 rue 6745 omrane supérieur	1091	ariana	chiheb	souli ch	53090722	Tunisia	souli	Privé	mnihla	\N
145053122	18 rue 6745 omrane supérieur	10911	arianaa	chihebdf	hdcvjnzu	53090722	Samoa	soulidfg	Publique	mnihla1541	\N
71878962	18 rue 6745 omrane supérieur	1091	ariana	chiheb	souli chiheb	53090722	Samoa	souli	Publique	mnihla	\N
84142865	18 rue 6745 omrane supérieur	1091	ariana	chiheb	souli chiheb	53090722	Pakistan	souli	Publique	mnihla	\N
562054346	18 rue 6745 omrane supérieur	1091	ariana	chiheb	souli chiheb	53090722	Kosovo	souli	Publique	mnihla	\N
92+539489	18 rue 6745 omrane supérieur	10915	arianaa	chiheba	souli chiheba	53090721	Kosovo	soulia	Publique	mnihlaa	\N
952898983	18 rue 6745 omrane supérieur	1091	528454edzed	chiheb	souli chiheb	53090722	Djibouti	souli	Publique	mnihla	\N
1234567888	18 rue 6745 omrane supérieur	1091	ariana	chiheb	ESPRIT	53090722	Czechia	souli	Privé	mnihla	\N
145236587845	18 rue 6745 omrane supérieur	1091	test	chiheb	ESPRIT	53090722	Jordan	souli	Publique	mnihla	\N
785478214	18 rue 6745 omrane supérieur	1091	ariana	chiheb	ESPRIT	53090722	Pakistan	souli	Privé	mnihla	\N
5999858741	18 rue 6745 omrane supérieur	1091	test	chiheb	souli chiheb	53090722	Pakistan	souli	Privé	mnihla	\N
545226rtfgfg	18 rue 6745 omrane supérieur	1091	acab	chiheb	dskjksjfqdjkfl	53090722	Samoa	souli	formation	mnihla	\N
\.


--
-- TOC entry 3361 (class 0 OID 33340)
-- Dependencies: 211
-- Data for Name: dates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dates (id, daterdv, maxrdv, idinst) FROM stdin;
13	2023-12-16	15	\N
14	2023-12-17	1	\N
16	2023-12-07	3	\N
17	2023-12-14	20	\N
15	2023-12-13	4	\N
18	2024-01-10	66	\N
19	2024-01-11	8	\N
\.


--
-- TOC entry 3363 (class 0 OID 33347)
-- Dependencies: 213
-- Data for Name: employe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employe (id_employe, cin, email, nom, password, prenom, statut, username, idinst, role_id_role) FROM stdin;
19	05555555	chiheb.souli@esprit.tn	chiheb	$2a$10$2zE56UHi1W.w.y4Z/w.jG.AyS86CGn2bnuo.iKpUsJ5gETQETVvd.	chiheb	ACTIF	testt	\N	3
2	07240202	jawharghod@gmail.com	jawhar	$2a$10$zG5MtFkobcXNx8idQ55D.OHmVoNfk.GB/cVz91q7kEkz6oqrcRDpK	jawhar	ACTIF	jawhar	\N	2
3	55226644	jawhar.ghodbane@esprit.tn	chiheb	$2a$10$rk9ZJf046ndrFOytwz0/g.BVLpPy0yB1bBl7/UMWrhZ2cWvdvYpfy	souli	ACTIF	chiheb	\N	3
9	14505322	shyheb.souli@gmail.com	chiheb	$2a$10$raT1F3vQRxuAgy9P.LATJ.MUdlXCAqjfLXx9rBX9xKi916SWyZbKu	souli	ACTIF	testing	\N	2
10	54156156	amine.djobbi@esprit.tn	amine	$2a$10$s6sR6iFf8BHwuNZZGJawXOWeqXLoEZL4GaLa4MX.MjDpIPyXGNL7S	djobii	NON_ACTIF	djo	\N	2
13	11545416	chiheb.souli04@gmail.com	ciheb	$2a$10$16Z7JtnZPB0zWq45uW26VuWp44YfFyA53W2N5GaF.aitBbtBBkD.O	iihh	NON_ACTIF	souli	\N	3
5	14560518	chiheffffb.souli@esprit.tn	superadmin	superadmin	superadmin	ACTIF	superadmin	\N	1
12	65265645	chihggeb.souli@esprit.tn	kzejhdih	$2a$10$SXYSMctXP1AFR86cA..g4eCP3WZbtigaEkV16UYC/PAfQS0pzmxOq	ghh	NON_ACTIF	test	\N	2
\.


--
-- TOC entry 3365 (class 0 OID 33356)
-- Dependencies: 215
-- Data for Name: institution; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.institution (idinst, adresse, codepostal, gouvernerat, nominst, ville) FROM stdin;
\.


--
-- TOC entry 3367 (class 0 OID 33365)
-- Dependencies: 217
-- Data for Name: rendezvous; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rendezvous (idrdv, daterdv, datesaisie, etat, observations, passeport, id) FROM stdin;
7	2023-12-14	2023-12-11	Annulé	Dossier Conclus chiheb souli	14505319	2
9	2023-12-14	2023-12-11	Annulé	Dossier Conclus	14505217	2
2	2023-12-14	2023-12-07	Annulé	Sans représentant légal	1455778	2
1	2023-12-14	2023-12-07	Annulé	chiheb soulii	14505319	2
23	2023-12-14	2023-12-12	Annulé	\N	952898983	\N
24	2023-12-14	2023-12-12	Annulé	\N	14505319	\N
3	2023-12-14	2023-12-07	Annulé		145053177	2
4	2023-12-14	2023-12-07	Annulé		14505322	2
11	2023-12-14	2023-12-12	Annulé	\N	14505306	\N
12	2023-12-14	2023-12-12	Annulé	\N	5555	\N
13	2023-12-14	2023-12-12	Annulé	\N	14505388	\N
14	2023-12-14	2023-12-12	Annulé	\N	154154128455	\N
15	2023-12-14	2023-12-12	Annulé	\N	14505377	\N
16	2023-12-14	2023-12-12	Annulé	\N	145053122	\N
17	2023-12-14	2023-12-12	Annulé	\N	71878962	\N
18	2023-12-14	2023-12-12	Annulé	\N	84142865	\N
19	2023-12-14	2023-12-12	Annulé	\N	562054346	\N
20	2023-12-14	2023-12-12	Annulé	\N	92+539489	\N
25	2023-12-14	2023-12-13	Annulé	\N	5555	\N
29	2023-12-19	2023-12-14	Annulé	\N	785478214	\N
31	2024-01-03	2023-12-28	Annulé	\N	14505322	\N
6	2023-12-14	2023-12-07	Annulé		88888888	2
10	2024-01-11	2023-12-11	Terminé	Absent testt	14505316	3
32	2024-01-23	2024-01-11	EnAttente	\N	545226rtfgfg	\N
26	2023-12-14	2023-12-14	EnCours	\N	14505319	\N
27	2023-12-14	2023-12-14	Terminé	\N	1234567888	\N
22	2023-12-14	2023-12-12	Annulé	Dossier Conclus chiheb soulii	14505319	\N
30	2023-12-21	2023-12-14	Annulé	\N	5999858741	\N
28	2023-12-14	2023-12-14	Terminé	Dossier Conclus test observation	145236587845	3
5	2023-12-14	2023-12-07	Terminé	Manque de pièces test test test	8484854	3
\.


--
-- TOC entry 3369 (class 0 OID 33374)
-- Dependencies: 219
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id_role, role_name) FROM stdin;
1	SUPER_ADMIN
2	ADMIN
3	AGENT
\.


--
-- TOC entry 3371 (class 0 OID 33381)
-- Dependencies: 221
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings (idparam, maxrdvg, idinst) FROM stdin;
1	8	\N
\.


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 210
-- Name: dates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dates_id_seq', 19, true);


--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 212
-- Name: employe_id_employe_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employe_id_employe_seq', 19, true);


--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 214
-- Name: institution_idinst_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.institution_idinst_seq', 1, false);


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 216
-- Name: rendezvous_idrdv_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rendezvous_idrdv_seq', 32, true);


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 218
-- Name: role_id_role_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_role_seq', 1, false);


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 220
-- Name: settings_idparam_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.settings_idparam_seq', 1, false);


--
-- TOC entry 3200 (class 2606 OID 33338)
-- Name: citoyen citoyen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citoyen
    ADD CONSTRAINT citoyen_pkey PRIMARY KEY (passeport);


--
-- TOC entry 3202 (class 2606 OID 33345)
-- Name: dates dates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dates
    ADD CONSTRAINT dates_pkey PRIMARY KEY (id);


--
-- TOC entry 3204 (class 2606 OID 33354)
-- Name: employe employe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employe
    ADD CONSTRAINT employe_pkey PRIMARY KEY (id_employe);


--
-- TOC entry 3206 (class 2606 OID 33363)
-- Name: institution institution_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.institution
    ADD CONSTRAINT institution_pkey PRIMARY KEY (idinst);


--
-- TOC entry 3208 (class 2606 OID 33372)
-- Name: rendezvous rendezvous_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rendezvous
    ADD CONSTRAINT rendezvous_pkey PRIMARY KEY (idrdv);


--
-- TOC entry 3210 (class 2606 OID 33379)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id_role);


--
-- TOC entry 3212 (class 2606 OID 33386)
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (idparam);


--
-- TOC entry 3217 (class 2606 OID 33407)
-- Name: rendezvous fk4jl7ugyxomlehnjrfe3cfi7y; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rendezvous
    ADD CONSTRAINT fk4jl7ugyxomlehnjrfe3cfi7y FOREIGN KEY (passeport) REFERENCES public.citoyen(passeport);


--
-- TOC entry 3215 (class 2606 OID 33397)
-- Name: employe fk6ticn7b1m98c0frmmdcgc2o0q; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employe
    ADD CONSTRAINT fk6ticn7b1m98c0frmmdcgc2o0q FOREIGN KEY (idinst) REFERENCES public.institution(idinst);


--
-- TOC entry 3214 (class 2606 OID 33392)
-- Name: dates fkaud1gjg4fpq4rl8ul34pnpsno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dates
    ADD CONSTRAINT fkaud1gjg4fpq4rl8ul34pnpsno FOREIGN KEY (idinst) REFERENCES public.institution(idinst);


--
-- TOC entry 3216 (class 2606 OID 33402)
-- Name: employe fkllcrunj04dtal68cimmobnvsw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employe
    ADD CONSTRAINT fkllcrunj04dtal68cimmobnvsw FOREIGN KEY (role_id_role) REFERENCES public.role(id_role);


--
-- TOC entry 3213 (class 2606 OID 33387)
-- Name: citoyen fkn1xg6ag2qg5vr3cj0tufl5nj4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citoyen
    ADD CONSTRAINT fkn1xg6ag2qg5vr3cj0tufl5nj4 FOREIGN KEY (idinst) REFERENCES public.institution(idinst);


--
-- TOC entry 3218 (class 2606 OID 33412)
-- Name: rendezvous fkq0fdfgfn3mi8bba8jbu43t2v4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rendezvous
    ADD CONSTRAINT fkq0fdfgfn3mi8bba8jbu43t2v4 FOREIGN KEY (id) REFERENCES public.employe(id_employe);


--
-- TOC entry 3219 (class 2606 OID 33417)
-- Name: settings fktg1ni101qmohkt3kqb9d16tia; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT fktg1ni101qmohkt3kqb9d16tia FOREIGN KEY (idinst) REFERENCES public.institution(idinst);


-- Completed on 2024-06-24 16:51:53

--
-- PostgreSQL database dump complete
--

