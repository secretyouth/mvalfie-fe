import Reat, { useState } from 'react'
import Link from 'next/link'
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'
import HubSpotFormModal from './hubspot-form'
import $ from 'jquery'

export default function Footer() {
    const [modalData, setModalData] = useState({})
    const [overlayModal, showOverlayModal] = useState(false)

    const { loaded, error, formCreated } = useHubspotForm({
        portalId: '9041877',
        formId: '59a74f48-e3cf-4448-af2e-4096b67a5941',
        target: '#my-hubspot-form-footer',
    })

    const showModal = (data) => {
        //console.log('show modal', data);
        if (data === undefined) {
            data = null
        }

        if (data != null) {
            $('body').addClass('modal-open')
        } else {
            $('body').removeClass('modal-open')
        }
        setModalData(data ? data : {})
        showOverlayModal(!overlayModal)
    }

    return (
        <div>
            {modalData && <HubSpotFormModal overlay showForm={overlayModal} data={modalData} closeForm={showModal} />}

            <footer className="footer flex align-items-center justify-content-center text-light">
                <div className="mw-xl text-center w-100 flex justify-content-between align-items-center">
                    <div className="logo-section text-left">
                        <svg className="logo" viewBox="0 0 1581 1558" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="#ffffff" fillRule="nonzero">
                                <path
                                    d="M1058.508,514.396309 C1085.91042,529.728197 1115.47619,549.38909 1137.65052,566.88548 C1161.62763,586.005247 1206.6974,631.099038 1224.72531,654.006683 C1293.23135,740.947511 1334.87582,844.663228 1344.61089,953.249075 C1347.49535,985.355854 1345.69256,1051.19279 1341.00531,1081.49581 C1327.3041,1172.04415 1295.75526,1251.22884 1244.73628,1323.01815 C1191.1934,1398.59535 1116.91842,1461.90703 1035.79284,1501.40919 C974.858515,1530.99072 920.053677,1546.86373 851.367351,1554.98061 C834.601398,1556.96474 763.571444,1558.94887 754.016653,1557.50586 C751.132188,1557.14511 739.774606,1555.88249 728.777583,1554.80024 C610.334234,1543.07585 491.530326,1486.7988 403.554139,1400.94022 C312.693488,1312.01527 260.051999,1208.6603 240.041022,1079.69206 C236.074882,1054.80029 234.63265,975.615595 237.517115,947.83782 C253.742231,788.025428 333.786139,648.054303 463.767349,552.094717 C634.671908,426.01248 873.181119,410.860966 1058.508,514.396309 Z M1325,1010 L1217.30897,1010 L1215.14069,1036.706 C1202.49241,1188.46106 1108.17241,1323.61509 969.583448,1388.21475 C924.953103,1409.14648 872.191724,1423.22127 828.284138,1426.1084 C819.791724,1426.64974 810.034483,1427.37153 806.962759,1427.91286 L801,1428.81509 L801,1536 L815.997241,1535.45866 C824.128276,1535.09777 840.571034,1533.6542 852.496552,1532.21063 C968.86069,1517.9554 1075.10621,1467.97187 1157.86207,1388.57564 C1243.68966,1306.47273 1298.8,1203.07719 1317.59172,1089.39623 C1321.5669,1065.21647 1325,1032.55575 1325,1018.66141 L1325,1010 Z M365.413793,1011 L257,1011 L257,1022.5244 C257,1038.37045 260.071724,1067.18144 264.408276,1092.93127 C292.776552,1262.01581 404.623448,1409.13196 561.10069,1483.68041 C610.248276,1507.08935 663.371034,1523.11546 715.048276,1530.31821 C741.971034,1534.09966 745.042759,1534.45979 764.376552,1534.63986 L781,1535 L781,1429.29966 L775.398621,1428.03918 C772.326897,1427.49897 765.822069,1426.95876 760.943448,1426.95876 C736.731034,1426.95876 683.788966,1415.97457 648.193103,1403.54983 C627.413793,1396.34708 589.649655,1378.16014 568.147586,1365.19519 C471.84,1306.67285 399.925517,1206.73471 375.532414,1097.43299 C370.111724,1072.58351 365.413793,1038.55052 365.413793,1022.5244 L365.413793,1011 Z M802,467 L802,575.155655 L816.079228,576.419578 C843.696176,578.586302 871.854633,583.280872 895.861523,589.239364 C1014.81295,619.392944 1115.53359,700.283985 1170.94798,810.064684 C1196.3989,860.441024 1210.47813,909.372881 1215.53221,965.166033 L1217.69824,989 L1326,989 L1324.73648,970.582843 C1318.23837,873.44137 1287.37237,782.98063 1233.2215,702.81183 C1212.64416,672.116569 1194.23286,650.449325 1163.72787,620.656866 C1117.15811,575.336216 1076.36445,546.627119 1021.67206,520.445866 C956.510506,489.570045 892.973476,473.139052 818.786772,468.083362 L802,467 Z M779.097485,468 L762.852222,468.540728 C714.65794,470.162912 654.911471,482.419411 605.092663,500.623917 C580.002756,509.816291 529.642439,534.870017 505.816052,549.830156 C402.929383,614.897747 324.952118,713.129983 285.241474,827.584055 C270.440234,869.760832 259.971064,923.112652 257.26352,967.812825 L256,988 L364.121254,988 L366.287289,963.306759 C377.658973,834.793761 446.972098,718.897747 556.176369,646.079723 C614.839821,607.147314 681.98691,583.896014 756.173614,577.046794 L780,574.70364 L779.638994,521.35182 L779.097485,468 Z M622.521072,635.005399 C577.286768,656.29585 540.342417,682.277418 505.740878,716.919508 C425.544602,797.390196 384.455275,902.579458 388.239818,1016.60967 C390.222198,1076.51162 403.377991,1128.47475 429.689578,1181.70088 C482.673185,1288.51399 580.891095,1366.99997 696.770208,1394.60539 C747.591218,1406.69404 787.058598,1408.85917 841.664152,1402.5442 C926.18562,1392.62069 1006.92254,1353.82876 1070.3587,1292.84425 C1119.19733,1245.57223 1152.71757,1191.80482 1175.42483,1124.14449 C1188.76084,1083.72872 1193.62668,1053.23646 1194,1005.78402 C1194.16733,958.331571 1190.74322,931.628294 1178.48851,889.408247 C1148.39238,784.579839 1072.16086,692.381361 974.123169,642.222501 C864.371412,585.929105 733.17391,583.222692 622.521072,635.005399 Z M799.933953,703.540743 C803.133397,706.7366 803.531981,709.407887 803.543325,726.881126 L803.543583,748.249971 L817.62114,749.511925 C863.102478,753.478066 917.607892,773.84961 956.050452,801.071761 C976.625343,815.674371 1005.68286,844.338755 1019.76042,863.628624 L1030.58931,878.591793 L1031.85268,868.135603 C1034.19894,844.879593 1039.25242,837.668427 1050.44228,841.634568 C1059.46635,844.879593 1059.82731,848.485176 1054.59335,893.735241 C1050.2618,931.774141 1049.53987,935.199444 1046.2912,935.740282 C1044.30591,935.920561 1026.07727,929.430512 1005.86335,921.137671 C965.255008,904.732269 960.021045,900.946407 963.450193,891.571891 C964.352601,888.867704 967.240305,885.4424 969.947527,884.000167 C974.459565,881.476259 975.722935,881.656538 991.424826,887.966308 C1000.62938,891.571891 1008.39009,894.276079 1008.75105,893.91552 C1009.11201,893.735241 1005.3219,887.786029 1000.4489,880.935422 C964.713564,829.916424 901.184075,789.714175 839.27892,778.536868 C831.157252,777.094634 819.606436,775.291843 814.01151,774.570726 L803.543583,773.489052 L803.543583,1072.93271 L843.249513,1073.47355 C877.72148,1074.01439 883.316406,1074.37494 885.843147,1077.07913 C889.994222,1081.04527 889.81374,1090.23951 885.662666,1094.74649 C882.717208,1098.03478 880.437077,1098.33246 847.205933,1098.35101 L803.543583,1098.35207 L803.543583,1169.74261 L815.455362,1174.79043 C830.254845,1181.28048 843.610476,1193.90002 850.10781,1207.78151 C854.258885,1216.79547 854.980811,1220.58133 854.980811,1234.46282 C854.800329,1248.16404 854.078403,1252.31046 850.10781,1260.6033 C843.249513,1275.20591 834.044956,1284.76071 820.147881,1291.61131 C809.860435,1296.65913 806.070324,1297.56053 792.714693,1297.92108 C783.149173,1298.28164 774.305579,1297.38025 769.252097,1295.75773 C764.74006,1294.3155 757.159837,1289.9888 752.286836,1286.38322 C726.838944,1266.91307 719.07824,1234.10227 732.975316,1205.61816 C740.014094,1191.55639 750.662503,1181.64104 766.544875,1174.79043 L778.276172,1169.74261 L778.276172,1098.35207 L736.600189,1098.35104 C704.571462,1098.32817 700.555423,1097.90498 696.879015,1095.10705 C691.284089,1090.41979 691.284089,1081.04527 696.879015,1076.35801 L697.107097,1076.18796 C700.809276,1073.48711 705.421663,1073.12031 738.617317,1073.1131 L778.276172,1073.11299 L778.276172,773.669331 L767.086319,774.751006 C694.713237,781.781892 627.7546,819.099675 584.800003,876.067885 C577.941706,885.4424 572.527261,893.374683 572.888224,893.735241 C573.249187,894.276079 581.009891,891.75217 589.853485,888.146588 C603.389597,882.738213 606.638264,882.017097 610.96982,883.639609 C617.828118,886.343796 620.53534,892.833845 617.828118,899.684453 C615.842821,904.55199 611.511265,906.71534 577.039298,920.777113 C555.742481,929.430512 536.972405,936.10084 535.16759,935.740282 C532.460367,935.199444 531.377478,930.331907 527.94833,900.946407 C522.714366,855.876621 522.714366,849.026013 527.767848,844.158476 C535.16759,837.307869 544.372146,840.552893 547.079369,851.009084 C548.162258,854.614667 549.425628,862.36667 549.967073,868.135603 L551.230443,878.591793 L562.059334,863.808903 C583.175669,834.96424 616.92571,804.857623 648.690454,786.288871 C679.733273,768.080677 722.507388,754.199183 759.867059,750.052763 L778.276172,747.889413 L778.276635,726.825652 C778.291935,710.094307 778.702765,707.257407 781.885802,703.901302 C786.578322,698.853486 795.060952,698.673206 799.933953,703.540743 Z M790.829329,1196 C750.091104,1196 736.990265,1250.65501 773.062438,1270.20051 C779.882052,1273.82005 783.112396,1274.36298 793.162355,1273.82005 C803.03285,1273.27712 806.622121,1272.19126 812.903345,1267.66684 C828.157747,1256.9892 834.080044,1236.90077 827.080965,1220.61285 C819.72296,1203.782 808.057829,1196 790.829329,1196 Z M904,2.78532752e-12 L904,246 L878,246 L878,2.78532752e-12 L904,2.78532752e-12 Z M1210,2.55795385e-12 L1210,22.6206896 L1062.87805,22.6206896 L1062.87805,114.517241 L1190.19512,114.517241 L1190.19512,135.724138 L1062.87805,135.724138 L1062.87805,223.37931 L1205.7561,223.37931 L1205.7561,246 L1036,246 L1036,2.55795385e-12 L1210,2.55795385e-12 Z M628.916664,3.75166564e-12 L628.916664,104.62069 L756.416664,104.62069 L756.416664,127.241379 L628.916664,127.241379 L628.916664,223.37931 L772,223.37931 L772,246 L602,246 L602,3.75166564e-12 L628.916664,3.75166564e-12 Z M506,4.206413e-12 L506,22.6206896 L367.669564,22.6206896 L367.669564,246 L342,246 L342,4.206413e-12 L506,4.206413e-12 Z M25.8295835,4.68958206e-12 L39.0892783,30.1440265 C46.4244281,46.5604916 53.1953361,61.5617444 54.3238212,63.4015206 L56.2986693,66.5149882 L124.148809,66.2319459 L191.998951,65.8073821 L206.528188,33.2574941 L221.057432,0.707606138 L234.599244,0.283042294 C241.934394,0.141521549 248,0.283042294 248,0.566085393 C248,0.990648432 223.032275,56.3254584 192.422133,123.406532 L136.844262,245.539372 L124.148809,245.963935 C117.09578,246.105457 111.030175,245.822415 110.748054,245.256329 C109.196387,242.708947 0.861860825,4.81172222 0.156557653,2.54738226 C-0.525925369,0.356303667 0.640716676,0.0203894034 11.4527113,0.000591604388 L25.8295835,4.68958206e-12 Z M125.629121,85.0005101 L121.714877,85.000683 C89.1333231,85.0229386 65.727807,85.5863349 66.0023908,86.287076 C70.9056716,99.7298664 124.001196,217.711805 124.701664,216.996763 C125.262039,216.42473 138.43085,186.964997 153.841161,151.64192 C169.391567,116.318842 182,86.85911 182,86.287076 C182,85.5862634 156.83476,85.0228238 125.629121,85.0005101 Z M1372.05519,0.673949003 L1378,7.50943287 L1363.51475,22.4384651 C1367.66984,28.9489483 1370.67364,36.7489483 1372.5157,45.8384651 L1372.5157,45.8384651 L1364.10086,48.4804006 C1362.64605,40.9005612 1360.37488,34.3586258 1357.27688,28.8545942 L1357.27688,28.8545942 L1329.43673,57.6223361 C1337.74691,62.4553999 1343.59753,66.869109 1346.97812,70.873949 C1350.34824,74.8997555 1352.04377,79.4392709 1352.04377,84.5029813 C1352.04377,90.7933038 1349.90866,95.7207219 1345.63844,99.3062071 C1341.38915,102.881206 1335.65366,104.673949 1328.43197,104.673949 C1320.5823,104.673949 1314.34444,102.682012 1309.71836,98.7191103 C1305.08183,94.7457225 1302.76879,89.5142702 1302.76879,83.0352393 C1302.76879,79.0618516 1303.66889,75.2981439 1305.49001,71.7545942 C1307.33206,68.2320135 1310.66032,63.9545942 1315.49572,58.9223361 C1306.22265,53.5755632 1299.64986,48.4908838 1295.77735,43.65782 C1291.92578,38.8142729 1290,33.3521741 1290,27.2610458 C1290,22.2287877 1291.44434,17.7416909 1294.35395,13.7997555 C1297.25309,9.87878905 1301.28259,6.83846513 1306.4529,4.65781997 C1311.61275,2.47717481 1317.4843,1.38685223 1324.07802,1.38685223 C1338.08183,1.38685223 1349.38535,5.97878637 1357.98858,15.1836264 L1357.98858,15.1836264 L1372.05519,0.673949003 Z M1325.13821,61.673949 C1320.71748,66.3878749 1317.75,70.1312883 1316.23577,72.8935224 C1314.74187,75.6450921 1314,78.5459704 1314,81.5961573 C1314,85.8301591 1315.38211,89.2322928 1318.14634,91.7918913 C1320.9309,94.3728184 1324.77236,95.673949 1329.65041,95.673949 C1334.14228,95.673949 1337.65854,94.5008011 1340.17886,92.1758311 C1342.71951,89.8721924 1344,86.7366856 1344,82.7906366 C1344,79.1432101 1342.62805,75.7944007 1339.89431,72.7228825 C1337.18089,69.6726957 1332.26219,65.9932708 1325.13821,61.673949 Z M1542.08414,1.673949 C1549.45712,1.673949 1556.10437,3.33665947 1562.02589,6.64102941 C1567.96845,9.95592485 1572.6068,14.5757286 1575.95146,20.4899231 C1579.31715,26.4146404 1581,33.1180936 1581,40.6108081 C1581,48.1035227 1579.31715,54.8174987 1575.95146,60.7316932 C1572.6068,66.6564106 1567.96845,71.2972625 1562.02589,74.6647747 C1556.10437,78.0112412 1549.45712,79.673949 1542.08414,79.673949 C1534.67961,79.673949 1528.01133,78.0112412 1522.10032,74.6647747 C1516.1788,71.2972625 1511.5089,66.6564106 1508.09061,60.7316932 C1504.69336,54.8174987 1503,48.1035227 1503,40.6108081 C1503,33.1180936 1504.69336,26.4146404 1508.09061,20.4899231 C1511.5089,14.5757286 1516.1788,9.95592485 1522.10032,6.64102941 C1528.01133,3.33665947 1534.67961,1.673949 1542.08414,1.673949 Z M1458.62795,1 C1465.09679,1 1470.86631,2.29438815 1475.94676,4.87263896 C1481.01694,7.46141527 1485.03811,11.2182953 1488,16.1538046 L1480.43073,21.4155424 C1477.96249,17.6270912 1474.81549,14.796277 1471.01028,12.9125742 C1467.22565,11.0078258 1463.09135,10.0501889 1458.62795,10.0501889 C1453.21839,10.0501889 1448.3539,11.3024831 1444.0242,13.7965461 C1439.68421,16.2695635 1436.31095,19.7949258 1433.90442,24.3621155 C1431.4876,28.9082569 1430.28433,34.1068524 1430.28433,39.9368591 C1430.28433,45.8615765 1431.4876,51.0812203 1433.90442,55.5957906 C1436.31095,60.1208837 1439.68421,63.625203 1444.0242,66.1192661 C1448.3539,68.5922835 1453.21839,69.8235294 1458.62795,69.8235294 C1463.09135,69.8235294 1467.22565,68.8974636 1471.01028,67.0453319 C1474.81549,65.1932002 1477.96249,62.3729088 1480.43073,58.5844576 L1488,63.8461954 C1485.03811,68.8132758 1480.98609,72.5912041 1475.86449,75.1694549 C1470.73261,77.7266601 1464.98366,79 1458.62795,79 C1451.22323,79 1444.60012,77.3583378 1438.75862,74.0750135 C1432.91712,70.7706435 1428.32002,66.1192661 1424.97762,60.141932 C1421.65578,54.1645979 1420,47.4295737 1420,39.9368591 C1420,32.4441446 1421.65578,25.7406914 1424.97762,19.8159741 C1428.32002,13.9017795 1432.91712,9.28197585 1438.75862,5.96708041 C1444.60012,2.66271047 1451.22323,1 1458.62795,1 Z M1541.58419,9.673949 C1536.13257,9.673949 1531.23874,10.9309919 1526.89217,13.4345124 C1522.56665,15.9169074 1519.16728,19.4556378 1516.70458,24.0401462 C1514.23135,28.6035265 1513,33.821835 1513,39.673949 C1513,45.5366257 1514.23135,50.7654997 1516.70458,55.3500053 C1519.16728,59.9133856 1522.56665,63.4521187 1526.89217,65.9556391 C1531.23874,68.4380342 1536.13257,69.673949 1541.58419,69.673949 C1547.02529,69.673949 1551.9086,68.4380342 1556.23412,65.9556391 C1560.54911,63.4521187 1563.91691,59.9133856 1566.33752,55.3500053 C1568.77917,50.7654997 1570,45.5366257 1570,39.673949 C1570,33.821835 1568.77917,28.6035265 1566.33752,24.0401462 C1563.91691,19.4556378 1560.54911,15.9169074 1556.23412,13.4345124 C1551.9086,10.9309919 1547.02529,9.673949 1541.58419,9.673949 Z M1324.63379,9.673949 C1317.23525,9.673949 1311.27647,11.3310235 1306.76799,14.6661441 C1302.24899,18.0222417 1300,22.448094 1300,27.9646807 C1300,32.5163867 1301.52385,36.6276062 1304.58205,40.2983392 C1307.62975,43.9900466 1313.19968,48.1117532 1321.27082,52.673949 L1321.27082,52.673949 L1352,21.1266319 C1344.9903,13.49151 1335.86823,9.673949 1324.63379,9.673949 Z"
                                    id="Shape-Copy"
                                    fillRule="nonzero"
                                    transform="translate(790.500000, 779.000000) scale(-1, 1) rotate(-180.000000) translate(-790.500000, -779.000000) "
                                ></path>
                            </g>
                        </svg>

                        <p>MV Alfie & Co creates an unrivaled luxurious experience for all guests and shareholders.</p>
                    </div>
                    {/* <svg className="logo" viewBox="0 0 856 896" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Alfie-Dark" fill="#fff" fillRule="nonzero">
                            <g
                                id="Group"
                                transform="translate(428.100000, 448.000000) scale(-1, 1) rotate(-180.000000) translate(-428.100000, -448.000000) translate(0.100000, 0.000000)"
                            >
                                <path
                                    d="M583.3,317.1 C598.5,325.6 614.9,336.5 627.2,346.2 C640.5,356.8 665.5,381.8 675.5,394.5 C713.5,442.7 736.6,500.2 742,560.4 C743.6,578.2 742.6,614.7 740,631.5 C732.4,681.7 714.9,725.6 686.6,765.4 C656.9,807.3 615.7,842.4 570.7,864.3 C536.9,880.7 506.5,889.5 468.4,894 C459.1,895.1 419.7,896.2 414.4,895.4 C412.8,895.2 406.5,894.5 400.4,893.9 C334.7,887.4 268.8,856.2 220,808.6 C169.6,759.3 140.4,702 129.3,630.5 C127.1,616.7 126.3,572.8 127.9,557.4 C136.9,468.8 181.3,391.2 253.4,338 C348.2,268.1 480.5,259.7 583.3,317.1 Z M730.9,592 L671.3,592 L670.1,606.8 C663.1,690.9 610.9,765.8 534.2,801.6 C509.5,813.2 480.3,821 456,822.6 C451.3,822.9 445.9,823.3 444.2,823.6 L440.9,824.1 L440.9,883.5 L449.2,883.2 C453.7,883 462.8,882.2 469.4,881.4 C533.8,873.5 592.6,845.8 638.4,801.8 C685.9,756.3 716.4,699 726.8,636 C729,622.6 730.9,604.5 730.9,596.8 L730.9,592 Z M198.9,592 L138.9,592 L138.9,598.4 C138.9,607.2 140.6,623.2 143,637.5 C158.7,731.4 220.6,813.1 307.2,854.5 C334.4,867.5 363.8,876.4 392.4,880.4 C407.3,882.5 409,882.7 419.7,882.8 L428.9,883 L428.9,824.3 L425.8,823.6 C424.1,823.3 420.5,823 417.8,823 C404.4,823 375.1,816.9 355.4,810 C343.9,806 323,795.9 311.1,788.7 C257.8,756.2 218,700.7 204.5,640 C201.5,626.2 198.9,607.3 198.9,598.4 L198.9,592 Z M341.2,384 C316.1,395.8 295.6,410.2 276.4,429.4 C231.9,474 209.1,532.3 211.2,595.5 C212.3,628.7 219.6,657.5 234.2,687 C263.6,746.2 318.1,789.7 382.4,805 C410.6,811.7 432.5,812.9 462.8,809.4 C509.7,803.9 554.5,782.4 589.7,748.6 C616.8,722.4 635.4,692.6 648,655.1 C655.4,632.7 658.1,615.8 658.303706,589.5 C658.4,563.2 656.5,548.4 649.7,525 C633,466.9 590.7,415.8 536.3,388 C475.4,356.8 402.6,355.3 341.2,384 Z M439.9,422 C441.645455,423.745455 441.88641,425.208815 441.89941,434.505262 L441.9,446.8 L449.7,447.5 C474.9,449.7 505.1,461 526.4,476.1 C537.8,484.2 553.9,500.1 561.7,510.8 L567.7,519.1 L568.4,513.3 C569.7,500.4 572.5,496.4 578.7,498.6 C583.7,500.4 583.9,502.4 581,527.5 C578.6,548.6 578.2,550.5 576.4,550.8 C575.3,550.9 565.2,547.3 554,542.7 C531.5,533.6 528.6,531.5 530.5,526.3 C531,524.8 532.6,522.9 534.1,522.1 C536.6,520.7 537.3,520.8 546,524.3 C551.1,526.3 555.4,527.8 555.6,527.6 C555.8,527.5 553.7,524.2 551,520.4 C531.2,492.1 496,469.8 461.7,463.6 C457.2,462.8 450.8,461.8 447.7,461.4 L441.9,460.8 L441.9,626.9 L463.9,627.2 C483,627.5 486.1,627.7 487.5,629.2 C489.8,631.4 489.7,636.5 487.4,639 C485.7,640.9 484.4,641 463.7,641 L441.9,641 L441.9,680.6 L448.5,683.4 C456.7,687 464.1,694 467.7,701.7 C470,706.7 470.4,708.8 470.4,716.5 C470.3,724.1 469.9,726.4 467.7,731 C463.9,739.1 458.8,744.4 451.1,748.2 C445.4,751 443.3,751.5 435.9,751.7 C430.6,751.9 425.7,751.4 422.9,750.5 C420.4,749.7 416.2,747.3 413.5,745.3 C399.4,734.5 395.1,716.3 402.8,700.5 C406.7,692.7 412.6,687.2 421.4,683.4 L427.9,680.6 L427.9,641 L406.5,641 C387.2,641 384.9,640.8 382.8,639.2 C379.7,636.6 379.7,631.4 382.8,628.8 C384.837,627.248 387.06218,627.01326 404.808446,627.000572 L427.9,627 L427.9,460.9 L421.7,461.5 C381.6,465.4 344.5,486.1 320.7,517.7 C316.9,522.9 313.9,527.3 314.1,527.5 C314.3,527.8 318.6,526.4 323.5,524.4 C331,521.4 332.8,521 335.2,521.9 C339,523.4 340.5,527 339,530.8 C337.9,533.5 335.5,534.7 316.4,542.5 C304.6,547.3 294.2,551 293.2,550.8 C291.7,550.5 291.1,547.8 289.2,531.5 C286.3,506.5 286.3,502.7 289.1,500 C293.2,496.2 298.3,498 299.8,503.8 C300.4,505.8 301.1,510.1 301.4,513.3 L302.1,519.1 L308.1,510.9 C319.8,494.9 338.5,478.2 356.1,467.9 C373.3,457.8 397,450.1 417.7,447.8 L427.9,446.6 L427.9,435.5 C427.9,425.7 428.1,424.1 429.9,422.2 C432.5,419.4 437.2,419.3 439.9,422 Z M434.8,694.8 C412.1,694.8 404.8,725 424.9,735.8 C428.7,737.8 430.5,738.1 436.1,737.8 C441.6,737.5 443.6,736.9 447.1,734.4 C455.6,728.5 458.9,717.4 455,708.4 C450.9,699.1 444.4,694.8 434.8,694.8 Z M440.9,290.9 L440.9,350.8 L448.7,351.5 C464,352.7 479.6,355.3 492.9,358.6 C558.8,375.3 614.6,420.1 645.3,480.9 C659.4,508.8 667.2,535.9 670,566.8 L671.2,580 L731.2,580 L730.5,569.8 C726.9,516 709.8,465.9 679.8,421.5 C668.4,404.5 658.2,392.5 641.3,376 C615.5,350.9 592.9,335 562.6,320.5 C526.5,303.4 491.3,294.3 450.2,291.5 L440.9,290.9 Z M428.4,291.5 L419.4,291.8 C392.7,292.7 359.6,299.5 332,309.6 C318.1,314.7 290.2,328.6 277,336.9 C220,373 176.8,427.5 154.8,491 C146.6,514.4 140.8,544 139.3,568.8 L138.6,580 L198.5,580 L199.7,566.3 C206,495 244.4,430.7 304.9,390.3 C337.4,368.7 374.6,355.8 415.7,352 L428.9,350.7 L428.7,321.1 L428.4,291.5 Z M855.9,-1.13686838e-12 L855.9,16 L751.9,16 L751.9,81 L841.9,81 L841.9,96 L751.9,96 L751.9,158 L852.9,158 L852.9,174 L732.9,174 L732.9,-1.13686838e-12 L855.9,-1.13686838e-12 Z M444.9,0 L444.9,74 L534.9,74 L534.9,90 L444.9,90 L444.9,158 L545.9,158 L545.9,174 L425.9,174 L425.9,0 L444.9,0 Z M357.9,0 L357.9,16 L260.9,16 L260.9,174 L242.9,174 L242.9,0 L357.9,0 Z M638.9,-1.36424205e-12 L638.9,174 L620.9,174 L620.9,-1.36424205e-12 L638.9,-1.36424205e-12 Z M18.4,0 L27.8,21.3 C33,32.9 37.8,43.5 38.6,44.8 L40,47 L88.1,46.8 L136.2,46.5 L156.8,0.5 L166.4,0.2 C171.6,0.1 175.9,0.2 175.9,0.4 C175.9,0.7 158.2,39.8 136.5,87.2 L97.1,173.5 L88.1,173.8 C83.1,173.9 78.8,173.7 78.6,173.3 C77.5,171.5 0.7,3.4 0.2,1.8 C-0.284615385,0.249230769 0.545940828,0.0136331361 8.24573946,0.000603004096 L18.4,0 Z M88.668844,61.0004776 L85.868008,61.0004776 C62.61104,61.01604 45.904,61.41 46.1,61.9 C49.6,71.3 87.5,153.8 88,153.3 C88.4,152.9 97.8,132.3 108.8,107.6 C119.9,82.9 128.9,62.3 128.9,61.9 C128.9,61.41 110.94052,61.01604 88.668844,61.0004776 Z"
                                    id="Shape"
                                ></path>
                            </g>
                        </g>
                    </g>
                </svg> */}

                    <div className="right flex footer-navigation">
                        <div className="nav-1">
                            <ul>
                                <li>
                                    <Link href="/" passHref>
                                        <a>Home</a>
                                    </Link>
                                </li>
                                <li>
                                    <a href="/about_us">About Us</a>
                                </li>
                                <li>
                                    <Link href="/insights" passHref>
                                        <a>Insights</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/boat-syndicate-sydney-gold-coast" passHref>
                                        <a>Become An Owner</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/boat-membership-sydney-gold-coast" passHref>
                                        <a>Become A Member</a>
                                    </Link>
                                </li>
                                {/*<li>*/}
                                {/*    <a href="#">Testimonials</a>*/}
                                {/*</li>*/}
                                <li>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            showModal({
                                                loaded: loaded,
                                                error: error,
                                                formCreated: formCreated,
                                                FormName: 'Request Booking',
                                                from: 'Footer',
                                            })
                                        }}
                                    >
                                        Booking Enquiry
                                    </a>
                                </li>
                                {/*
                        <li>
                            <a href="">Terms &amp; Conditions</a>
                        </li> */}
                            </ul>

                            <ul>
                                <li>
                                    <a>Luxury Boat Hire</a>
                                </li>
                                <li>
                                    <a href="/luxury-bareboat-hire-sydney">Sydney</a>
                                </li>
                                <li>
                                    <Link href="/luxury-bareboat-hire-gold-coast">
                                        <a>Gold Coast</a>
                                    </Link>
                                </li>
                                <li>
                                    <a href="/luxury-bareboat-whitsundays">Whitsundays</a>
                                </li>
                            </ul>

                            {/*<ul>*/}
                            {/*    <li>*/}
                            {/*        <Link href="javascript:void(0)">*/}
                            {/*            <a>Private Charter Hire</a>*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*    <li>*/}
                            {/*        <a href="/private_boat_hires/sydney">Sydney</a>*/}
                            {/*    </li>*/}
                            {/*    <li>*/}
                            {/*        <Link href="/private_boat_hires/gold-coast">*/}
                            {/*            <a>Gold Coast</a>*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*    <li>*/}
                            {/*        <a href="/private_boat_hires/whitsundays">Whitsundays</a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}

                            <ul>
                                <li>
                                    <a>Boats</a>
                                </li>
                                <li>
                                    <a href="/boats/bruce">Bruce</a>
                                </li>
                                <li>
                                    <Link href="/boats/v65princess">
                                        <a>G5</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/boats/alfie-II">
                                        <a>Alfie II</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="nav-4">
                            <ul>
                                <li>
                                    <Link href="/faq" passHref>
                                        <a>FAQ</a>
                                    </Link>
                                </li>
                                <li>
                                    <a href="/privacy-policy">Privacy Policy</a>
                                </li>
                                {/* <li>
                            <Link href="https://manage.mvalfieandco.com.au/admin" passHref>
                                <a atrget="_blank">Admin</a>
                            </Link>
                        </li> */}
                                <li>
                                    <Link href="/dashboard" passHref>
                                        <a>Owner Dashboard</a>
                                    </Link>
                                </li>
                                <li>
                                    <a href="#top">
                                        <i className="budicon-arrow-turn-up secondary md"></i>
                                    </a>
                                </li>
                                {/*
                        <li>
                            <a href="">Terms &amp; Conditions</a>
                        </li> */}
                            </ul>
                            <div className="social-media-btns">
                                <Link href="https://www.instagram.com/mv_alfieandco/">
                                    <a target="_blank">
                                        <svg height="511pt" viewBox="0 0 511 511.9" width="511pt" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m510.949219 150.5c-1.199219-27.199219-5.597657-45.898438-11.898438-62.101562-6.5-17.199219-16.5-32.597657-29.601562-45.398438-12.800781-13-28.300781-23.101562-45.300781-29.5-16.296876-6.300781-34.898438-10.699219-62.097657-11.898438-27.402343-1.300781-36.101562-1.601562-105.601562-1.601562s-78.199219.300781-105.5 1.5c-27.199219 1.199219-45.898438 5.601562-62.097657 11.898438-17.203124 6.5-32.601562 16.5-45.402343 29.601562-13 12.800781-23.097657 28.300781-29.5 45.300781-6.300781 16.300781-10.699219 34.898438-11.898438 62.097657-1.300781 27.402343-1.601562 36.101562-1.601562 105.601562s.300781 78.199219 1.5 105.5c1.199219 27.199219 5.601562 45.898438 11.902343 62.101562 6.5 17.199219 16.597657 32.597657 29.597657 45.398438 12.800781 13 28.300781 23.101562 45.300781 29.5 16.300781 6.300781 34.898438 10.699219 62.101562 11.898438 27.296876 1.203124 36 1.5 105.5 1.5s78.199219-.296876 105.5-1.5c27.199219-1.199219 45.898438-5.597657 62.097657-11.898438 34.402343-13.300781 61.601562-40.5 74.902343-74.898438 6.296876-16.300781 10.699219-34.902343 11.898438-62.101562 1.199219-27.300781 1.5-36 1.5-105.5s-.101562-78.199219-1.300781-105.5zm-46.097657 209c-1.101562 25-5.300781 38.5-8.800781 47.5-8.601562 22.300781-26.300781 40-48.601562 48.601562-9 3.5-22.597657 7.699219-47.5 8.796876-27 1.203124-35.097657 1.5-103.398438 1.5s-76.5-.296876-103.402343-1.5c-25-1.097657-38.5-5.296876-47.5-8.796876-11.097657-4.101562-21.199219-10.601562-29.398438-19.101562-8.5-8.300781-15-18.300781-19.101562-29.398438-3.5-9-7.699219-22.601562-8.796876-47.5-1.203124-27-1.5-35.101562-1.5-103.402343s.296876-76.5 1.5-103.398438c1.097657-25 5.296876-38.5 8.796876-47.5 4.101562-11.101562 10.601562-21.199219 19.203124-29.402343 8.296876-8.5 18.296876-15 29.398438-19.097657 9-3.5 22.601562-7.699219 47.5-8.800781 27-1.199219 35.101562-1.5 103.398438-1.5 68.402343 0 76.5.300781 103.402343 1.5 25 1.101562 38.5 5.300781 47.5 8.800781 11.097657 4.097657 21.199219 10.597657 29.398438 19.097657 8.5 8.300781 15 18.300781 19.101562 29.402343 3.5 9 7.699219 22.597657 8.800781 47.5 1.199219 27 1.5 35.097657 1.5 103.398438s-.300781 76.300781-1.5 103.300781zm0 0" />
                                            <path d="m256.449219 124.5c-72.597657 0-131.5 58.898438-131.5 131.5s58.902343 131.5 131.5 131.5c72.601562 0 131.5-58.898438 131.5-131.5s-58.898438-131.5-131.5-131.5zm0 216.800781c-47.097657 0-85.300781-38.199219-85.300781-85.300781s38.203124-85.300781 85.300781-85.300781c47.101562 0 85.300781 38.199219 85.300781 85.300781s-38.199219 85.300781-85.300781 85.300781zm0 0" />
                                            <path d="m423.851562 119.300781c0 16.953125-13.746093 30.699219-30.703124 30.699219-16.953126 0-30.699219-13.746094-30.699219-30.699219 0-16.957031 13.746093-30.699219 30.699219-30.699219 16.957031 0 30.703124 13.742188 30.703124 30.699219zm0 0" />
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="https://www.facebook.com/MValfie/">
                                    <a target="_blank">
                                        <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m475.074219 0h-438.148438c-20.394531 0-36.925781 16.53125-36.925781 36.925781v438.148438c0 20.394531 16.53125 36.925781 36.925781 36.925781h236.574219v-198h-66.5v-77.5h66.5v-57.035156c0-66.140625 40.378906-102.140625 99.378906-102.140625 28.257813 0 52.542969 2.105469 59.621094 3.046875v69.128906h-40.683594c-32.101562 0-38.316406 15.253906-38.316406 37.640625v49.359375h76.75l-10 77.5h-66.75v198h121.574219c20.394531 0 36.925781-16.53125 36.925781-36.925781v-438.148438c0-20.394531-16.53125-36.925781-36.925781-36.925781zm0 0" />
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="https://www.linkedin.com/company/mv-alfie">
                                    <a target="_blank">
                                        <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m475.074219 0h-438.148438c-20.394531 0-36.925781 16.53125-36.925781 36.925781v438.148438c0 20.394531 16.53125 36.925781 36.925781 36.925781h438.148438c20.394531 0 36.925781-16.53125 36.925781-36.925781v-438.148438c0-20.394531-16.53125-36.925781-36.925781-36.925781zm-293.464844 387h-62.347656v-187.574219h62.347656zm-31.171875-213.1875h-.40625c-20.921875 0-34.453125-14.402344-34.453125-32.402344 0-18.40625 13.945313-32.410156 35.273437-32.410156 21.328126 0 34.453126 14.003906 34.859376 32.410156 0 18-13.53125 32.402344-35.273438 32.402344zm255.984375 213.1875h-62.339844v-100.347656c0-25.21875-9.027343-42.417969-31.585937-42.417969-17.222656 0-27.480469 11.601563-31.988282 22.800781-1.648437 4.007813-2.050781 9.609375-2.050781 15.214844v104.75h-62.34375s.816407-169.976562 0-187.574219h62.34375v26.558594c8.285157-12.78125 23.109375-30.960937 56.1875-30.960937 41.019531 0 71.777344 26.808593 71.777344 84.421874zm0 0" />
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div id="my-hubspot-form"></div>*/}
            </footer>
        </div>
    )
}
