import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';

// Superior (top-down) view of the human brain
// Frontal poles at top, occipital poles at bottom

export const SUPERIOR_REGIONS = [
  { id: 'longitudinal_fissure', name: 'Longitudinal Fissure', x: 50, y: 50 },
  { id: 'central_sulcus', name: 'Central Sulcus', x: 50, y: 38 },
  { id: 'left_frontal', name: 'Left Frontal Lobe', x: 32, y: 22 },
  { id: 'right_frontal', name: 'Right Frontal Lobe', x: 68, y: 22 },
  { id: 'left_parietal', name: 'Left Parietal Lobe', x: 32, y: 55 },
  { id: 'right_parietal', name: 'Right Parietal Lobe', x: 68, y: 55 },
  { id: 'left_occipital', name: 'Left Occipital Lobe', x: 38, y: 82 },
  { id: 'right_occipital', name: 'Right Occipital Lobe', x: 62, y: 82 },
  { id: 'motor_cortex', name: 'Precentral Gyrus (Motor Cortex)', x: 50, y: 34 },
  { id: 'somatosensory_cortex', name: 'Postcentral Gyrus (Somatosensory Cortex)', x: 50, y: 42 },
];

// Hit areas for touch overlays (percentages of container)
const REGION_HIT_AREAS = {
  longitudinal_fissure: { left: '46%', top: '5%', width: '8%', height: '90%' },
  central_sulcus: { left: '10%', top: '33%', width: '80%', height: '10%' },
  left_frontal: { left: '5%', top: '5%', width: '42%', height: '33%' },
  right_frontal: { left: '53%', top: '5%', width: '42%', height: '33%' },
  left_parietal: { left: '5%', top: '42%', width: '42%', height: '28%' },
  right_parietal: { left: '53%', top: '42%', width: '42%', height: '28%' },
  left_occipital: { left: '15%', top: '72%', width: '32%', height: '23%' },
  right_occipital: { left: '53%', top: '72%', width: '32%', height: '23%' },
  motor_cortex: { left: '10%', top: '28%', width: '80%', height: '8%' },
  somatosensory_cortex: { left: '10%', top: '38%', width: '80%', height: '8%' },
};

export default function SuperiorView({
  width = 360,
  height = 320,
  showLabels = true,
  onHotspotPress,
  highlightedRegion,
}) {
  const handlePress = (regionId) => {
    if (onHotspotPress) onHotspotPress(regionId);
  };

  const isHighlighted = (regionId) => highlightedRegion === regionId;

  return (
    <View style={{ width, height, alignSelf: 'center', position: 'relative' }}>
      <Svg width={width} height={height} viewBox="0 0 360 320">
        {/* ============================================ */}
        {/* LEFT HEMISPHERE OUTLINE                      */}
        {/* ============================================ */}
        <Path
          d="M 178,12 C 170,10 158,11 145,14 C 128,18 112,26 98,38
             C 82,52 68,70 58,90 C 48,110 42,132 40,152
             C 38,172 40,192 46,210 C 52,228 62,244 76,256
             C 90,268 106,276 122,282 C 138,288 154,292 166,296
             C 172,298 176,300 178,302"
          fill="none"
          stroke="#B0BEC5"
          strokeWidth={2}
        />

        {/* ============================================ */}
        {/* RIGHT HEMISPHERE OUTLINE                     */}
        {/* ============================================ */}
        <Path
          d="M 182,12 C 190,10 202,11 216,14 C 234,18 250,27 264,39
             C 280,53 294,72 304,92 C 314,112 320,134 322,154
             C 324,174 322,194 316,212 C 310,230 300,246 286,258
             C 272,270 256,278 240,284 C 224,290 208,294 196,298
             C 190,300 184,301 182,302"
          fill="none"
          stroke="#B0BEC5"
          strokeWidth={2}
        />

        {/* ============================================ */}
        {/* LOBE REGION FILLS (very subtle tints)        */}
        {/* ============================================ */}

        {/* Left Frontal Lobe */}
        <Path
          d="M 178,12 C 170,10 158,11 145,14 C 128,18 112,26 98,38
             C 82,52 68,70 58,90 C 50,106 44,122 42,138
             L 78,130 L 110,124 L 140,120 L 170,118 L 178,118
             L 178,12 Z"
          fill={isHighlighted('left_frontal') ? '#4C6EF5' : '#4C6EF5'}
          fillOpacity={isHighlighted('left_frontal') ? 0.35 : 0.12}
        />

        {/* Right Frontal Lobe */}
        <Path
          d="M 182,12 C 190,10 202,11 216,14 C 234,18 250,27 264,39
             C 280,53 294,72 304,92 C 312,108 318,124 320,140
             L 284,132 L 252,126 L 222,122 L 192,120 L 182,118
             L 182,12 Z"
          fill={isHighlighted('right_frontal') ? '#4C6EF5' : '#4C6EF5'}
          fillOpacity={isHighlighted('right_frontal') ? 0.35 : 0.12}
        />

        {/* Left Parietal Lobe */}
        <Path
          d="M 42,138 L 78,130 L 110,124 L 140,120 L 170,118 L 178,118
             L 178,230 L 160,228 L 130,224 L 100,218 L 76,210
             C 60,200 50,186 44,170 C 40,158 40,148 42,138 Z"
          fill={isHighlighted('left_parietal') ? '#22D3EE' : '#22D3EE'}
          fillOpacity={isHighlighted('left_parietal') ? 0.35 : 0.12}
        />

        {/* Right Parietal Lobe */}
        <Path
          d="M 320,140 L 284,132 L 252,126 L 222,122 L 192,120 L 182,118
             L 182,230 L 200,228 L 232,224 L 262,218 L 286,210
             C 302,200 312,186 318,170 C 322,158 322,148 320,140 Z"
          fill={isHighlighted('right_parietal') ? '#22D3EE' : '#22D3EE'}
          fillOpacity={isHighlighted('right_parietal') ? 0.35 : 0.12}
        />

        {/* Left Occipital Lobe */}
        <Path
          d="M 178,230 L 160,228 L 130,224 L 100,218 L 76,210
             C 90,240 106,260 122,272 C 138,282 154,290 166,294
             C 172,296 176,298 178,302 L 178,230 Z"
          fill={isHighlighted('left_occipital') ? '#F472B6' : '#F472B6'}
          fillOpacity={isHighlighted('left_occipital') ? 0.35 : 0.12}
        />

        {/* Right Occipital Lobe */}
        <Path
          d="M 182,230 L 200,228 L 232,224 L 262,218 L 286,210
             C 272,240 256,260 240,272 C 224,282 208,290 196,294
             C 190,296 184,298 182,302 L 182,230 Z"
          fill={isHighlighted('right_occipital') ? '#F472B6' : '#F472B6'}
          fillOpacity={isHighlighted('right_occipital') ? 0.35 : 0.12}
        />

        {/* ============================================ */}
        {/* LONGITUDINAL FISSURE (deep midline)          */}
        {/* ============================================ */}
        <Line
          x1={180} y1={8} x2={180} y2={306}
          stroke="#64748B"
          strokeWidth={1.5}
          opacity={0.8}
        />
        {/* Fissure depth shading - left edge */}
        <Line
          x1={178} y1={10} x2={178} y2={304}
          stroke="#475569"
          strokeWidth={0.5}
          opacity={0.4}
        />
        {/* Fissure depth shading - right edge */}
        <Line
          x1={182} y1={10} x2={182} y2={304}
          stroke="#475569"
          strokeWidth={0.5}
          opacity={0.4}
        />

        {/* ============================================ */}
        {/* CENTRAL SULCUS (runs laterally ~40% down)    */}
        {/* ============================================ */}

        {/* Left central sulcus */}
        <Path
          d="M 178,118 C 168,119 155,121 140,124
             C 125,127 108,132 92,138 C 78,144 66,150 56,158"
          fill="none"
          stroke={isHighlighted('central_sulcus') ? '#FFFFFF' : '#FFFFFF'}
          strokeWidth={isHighlighted('central_sulcus') ? 1.8 : 1.2}
          strokeOpacity={isHighlighted('central_sulcus') ? 0.8 : 0.45}
        />

        {/* Right central sulcus */}
        <Path
          d="M 182,118 C 192,119 205,121 222,124
             C 238,128 254,134 270,140 C 284,146 296,152 306,160"
          fill="none"
          stroke={isHighlighted('central_sulcus') ? '#FFFFFF' : '#FFFFFF'}
          strokeWidth={isHighlighted('central_sulcus') ? 1.8 : 1.2}
          strokeOpacity={isHighlighted('central_sulcus') ? 0.8 : 0.45}
        />

        {/* ============================================ */}
        {/* LEFT HEMISPHERE SULCI (gyri/folding pattern) */}
        {/* ============================================ */}
        <G opacity={0.55}>
          {/* Superior frontal sulcus - left */}
          <Path d="M 172,20 C 165,28 158,38 152,50 C 146,62 142,76 138,88 C 135,98 133,108 132,116" fill="none" stroke="#64748B" strokeWidth={0.7} />
          {/* Middle frontal sulcus */}
          <Path d="M 160,18 C 148,24 136,34 126,48 C 116,62 108,78 102,94 C 97,108 94,120 92,130" fill="none" stroke="#64748B" strokeWidth={0.7} />
          {/* Inferior frontal sulcus */}
          <Path d="M 140,16 C 124,22 108,34 96,50 C 84,66 74,84 68,102 C 64,114 62,124 60,132" fill="none" stroke="#64748B" strokeWidth={0.7} />

          {/* Precentral sulcus (just anterior to central sulcus) */}
          <Path d="M 176,100 C 164,102 150,106 136,112 C 120,118 104,126 88,136 C 76,144 66,150 58,156" fill="none" stroke="#64748B" strokeWidth={0.8} />

          {/* Postcentral sulcus (just posterior to central sulcus) */}
          <Path d="M 176,136 C 164,138 150,142 134,148 C 118,154 102,162 88,170 C 78,176 68,182 60,188" fill="none" stroke="#64748B" strokeWidth={0.8} />

          {/* Superior frontal gyrus minor folds */}
          <Path d="M 170,30 C 166,36 163,44 160,54" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 168,48 C 164,56 161,66 158,76" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 166,66 C 162,74 160,84 157,94" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 174,40 C 172,48 170,58 168,68" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Middle frontal gyrus folds */}
          <Path d="M 154,26 C 146,36 140,48 134,60" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 148,40 C 140,52 134,64 128,76" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 142,54 C 134,66 128,78 122,90" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 136,68 C 128,80 122,92 116,104" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Inferior frontal gyrus folds */}
          <Path d="M 128,22 C 116,34 106,48 98,64" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 118,34 C 106,48 96,64 88,80" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 108,48 C 96,62 86,78 78,94" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 98,60 C 86,74 76,90 68,106" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Lateral frontal surface folds */}
          <Path d="M 86,42 C 78,56 70,72 64,88" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 74,56 C 66,70 60,86 56,102" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Intraparietal sulcus - left */}
          <Path d="M 174,148 C 162,154 148,162 132,172 C 118,180 104,190 92,200" fill="none" stroke="#64748B" strokeWidth={0.7} />

          {/* Superior parietal lobule folds */}
          <Path d="M 174,126 C 168,130 162,134 156,138" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 170,140 C 162,146 154,152 146,158" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 166,158 C 156,166 146,174 138,182" fill="none" stroke="#64748B" strokeWidth={0.5} />

          {/* Inferior parietal lobule folds */}
          <Path d="M 130,140 C 118,150 106,162 96,174" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 120,154 C 108,164 96,176 86,188" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 110,168 C 98,178 86,190 78,200" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Parieto-occipital sulcus - left */}
          <Path d="M 176,228 C 164,226 148,222 132,218 C 116,214 100,210 86,206" fill="none" stroke="#64748B" strokeWidth={0.8} />

          {/* Occipital sulci - left */}
          <Path d="M 174,240 C 162,242 148,244 136,244 C 124,244 112,240 102,234" fill="none" stroke="#64748B" strokeWidth={0.6} />
          <Path d="M 172,254 C 158,258 144,260 132,258 C 120,256 110,250 100,242" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 170,268 C 156,274 142,276 130,274 C 118,272 108,264 100,254" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 168,280 C 156,286 144,288 134,286 C 124,282 116,274 110,264" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Calcarine area folds */}
          <Path d="M 176,260 C 166,264 156,268 148,268" fill="none" stroke="#64748B" strokeWidth={0.4} />
          <Path d="M 174,274 C 164,278 154,280 146,278" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Extra minor folds for realism - left frontal */}
          <Path d="M 164,84 C 158,90 152,98 148,106" fill="none" stroke="#64748B" strokeWidth={0.35} />
          <Path d="M 130,82 C 122,92 116,104 112,114" fill="none" stroke="#64748B" strokeWidth={0.35} />

          {/* Minor parietal folds */}
          <Path d="M 160,172 C 150,180 140,190 132,198" fill="none" stroke="#64748B" strokeWidth={0.4} />
          <Path d="M 148,186 C 138,196 128,206 120,214" fill="none" stroke="#64748B" strokeWidth={0.35} />

          {/* Transverse connecting folds */}
          <Path d="M 100,44 C 108,42 118,38 128,32" fill="none" stroke="#64748B" strokeWidth={0.35} />
          <Path d="M 82,68 C 92,64 104,58 114,50" fill="none" stroke="#64748B" strokeWidth={0.35} />
          <Path d="M 68,92 C 78,86 90,78 100,68" fill="none" stroke="#64748B" strokeWidth={0.35} />
        </G>

        {/* ============================================ */}
        {/* RIGHT HEMISPHERE SULCI (slight asymmetry)    */}
        {/* ============================================ */}
        <G opacity={0.55}>
          {/* Superior frontal sulcus - right */}
          <Path d="M 188,20 C 196,28 204,40 210,52 C 216,64 220,78 224,90 C 227,100 229,110 230,118" fill="none" stroke="#64748B" strokeWidth={0.7} />
          {/* Middle frontal sulcus */}
          <Path d="M 200,18 C 214,24 228,36 238,50 C 248,64 256,80 262,96 C 266,110 268,122 270,132" fill="none" stroke="#64748B" strokeWidth={0.7} />
          {/* Inferior frontal sulcus */}
          <Path d="M 222,16 C 238,22 254,36 266,52 C 278,68 288,86 294,104 C 298,116 300,126 302,134" fill="none" stroke="#64748B" strokeWidth={0.7} />

          {/* Precentral sulcus - right */}
          <Path d="M 184,100 C 198,103 212,108 228,114 C 244,120 260,128 274,138 C 286,146 296,152 304,158" fill="none" stroke="#64748B" strokeWidth={0.8} />

          {/* Postcentral sulcus - right */}
          <Path d="M 184,136 C 198,139 214,144 230,150 C 246,156 262,164 276,172 C 286,178 296,184 304,190" fill="none" stroke="#64748B" strokeWidth={0.8} />

          {/* Superior frontal gyrus minor folds */}
          <Path d="M 190,32 C 194,38 198,46 202,56" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 192,50 C 196,58 200,68 204,78" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 194,68 C 198,76 202,86 206,96" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 186,42 C 188,50 192,60 194,70" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Middle frontal gyrus folds */}
          <Path d="M 206,26 C 216,38 224,50 230,62" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 214,42 C 222,54 230,66 236,78" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 222,56 C 230,68 238,80 244,92" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 230,70 C 238,82 244,94 250,106" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Inferior frontal gyrus folds */}
          <Path d="M 234,22 C 248,36 258,50 266,66" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 244,36 C 256,50 266,66 274,82" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 254,50 C 266,64 276,80 284,96" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 264,62 C 276,76 286,92 294,108" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Lateral frontal surface folds */}
          <Path d="M 276,44 C 284,58 292,74 298,90" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 288,58 C 296,72 302,88 306,104" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Intraparietal sulcus - right */}
          <Path d="M 186,150 C 200,156 216,164 232,174 C 248,182 264,192 276,202" fill="none" stroke="#64748B" strokeWidth={0.7} />

          {/* Superior parietal lobule folds */}
          <Path d="M 186,128 C 194,132 202,136 210,140" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 190,142 C 200,148 210,154 220,160" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 194,160 C 206,168 218,176 228,184" fill="none" stroke="#64748B" strokeWidth={0.5} />

          {/* Inferior parietal lobule folds */}
          <Path d="M 234,142 C 248,152 262,164 274,176" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 244,156 C 258,166 270,178 280,190" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 254,170 C 268,180 280,192 290,202" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Parieto-occipital sulcus - right */}
          <Path d="M 184,230 C 198,228 214,224 232,220 C 250,216 266,212 280,208" fill="none" stroke="#64748B" strokeWidth={0.8} />

          {/* Occipital sulci - right */}
          <Path d="M 186,242 C 200,244 216,246 230,246 C 244,246 256,242 266,236" fill="none" stroke="#64748B" strokeWidth={0.6} />
          <Path d="M 188,256 C 204,260 220,262 234,260 C 248,258 258,252 268,244" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 190,270 C 206,276 222,278 236,276 C 250,274 260,266 268,256" fill="none" stroke="#64748B" strokeWidth={0.5} />
          <Path d="M 192,282 C 208,288 222,290 234,288 C 246,284 256,276 264,266" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Calcarine area folds */}
          <Path d="M 186,262 C 198,266 210,270 220,270" fill="none" stroke="#64748B" strokeWidth={0.4} />
          <Path d="M 188,276 C 200,280 212,282 222,280" fill="none" stroke="#64748B" strokeWidth={0.4} />

          {/* Extra minor folds for realism - right frontal */}
          <Path d="M 198,86 C 204,92 210,100 214,108" fill="none" stroke="#64748B" strokeWidth={0.35} />
          <Path d="M 236,84 C 244,94 250,106 254,116" fill="none" stroke="#64748B" strokeWidth={0.35} />

          {/* Minor parietal folds */}
          <Path d="M 204,174 C 216,182 228,192 238,200" fill="none" stroke="#64748B" strokeWidth={0.4} />
          <Path d="M 218,188 C 230,198 242,208 252,216" fill="none" stroke="#64748B" strokeWidth={0.35} />

          {/* Transverse connecting folds */}
          <Path d="M 262,46 C 254,44 244,40 234,34" fill="none" stroke="#64748B" strokeWidth={0.35} />
          <Path d="M 280,70 C 270,66 258,60 248,52" fill="none" stroke="#64748B" strokeWidth={0.35} />
          <Path d="M 294,94 C 284,88 272,80 262,70" fill="none" stroke="#64748B" strokeWidth={0.35} />
        </G>

        {/* ============================================ */}
        {/* PRECENTRAL GYRUS (Motor Cortex) highlight    */}
        {/* ============================================ */}
        {/* Left motor strip */}
        <Path
          d="M 178,100 C 166,102 152,106 138,112 C 122,118 106,126 90,136 C 78,144 68,150 60,156
             L 56,158 C 66,150 78,144 92,138 C 108,132 124,127 140,124
             C 155,121 168,119 178,118 Z"
          fill={isHighlighted('motor_cortex') ? '#C084FC' : '#C084FC'}
          fillOpacity={isHighlighted('motor_cortex') ? 0.4 : 0.15}
        />
        {/* Right motor strip */}
        <Path
          d="M 182,100 C 196,103 210,108 226,114 C 242,120 258,128 272,138 C 284,146 294,152 302,158
             L 306,160 C 296,152 284,146 270,140 C 254,134 238,128 222,124
             C 206,121 194,119 182,118 Z"
          fill={isHighlighted('motor_cortex') ? '#C084FC' : '#C084FC'}
          fillOpacity={isHighlighted('motor_cortex') ? 0.4 : 0.15}
        />

        {/* ============================================ */}
        {/* POSTCENTRAL GYRUS (Somatosensory) highlight  */}
        {/* ============================================ */}
        {/* Left somatosensory strip */}
        <Path
          d="M 178,118 C 168,119 155,121 140,124 C 125,127 108,132 92,138 C 78,144 66,150 56,158
             L 60,162 C 68,156 78,150 92,144 C 108,138 124,133 140,130
             C 155,127 168,125 178,124 Z"
          fill={isHighlighted('somatosensory_cortex') ? '#F9A8D4' : '#F9A8D4'}
          fillOpacity={isHighlighted('somatosensory_cortex') ? 0.4 : 0.15}
        />
        {/* Right somatosensory strip */}
        <Path
          d="M 182,118 C 192,119 206,121 222,124 C 238,128 254,134 270,140 C 284,146 296,152 306,160
             L 304,164 C 294,156 282,150 268,144 C 252,138 236,133 220,130
             C 206,127 194,125 182,124 Z"
          fill={isHighlighted('somatosensory_cortex') ? '#F9A8D4' : '#F9A8D4'}
          fillOpacity={isHighlighted('somatosensory_cortex') ? 0.4 : 0.15}
        />

        {/* ============================================ */}
        {/* HOTSPOT DOTS                                 */}
        {/* ============================================ */}
        {SUPERIOR_REGIONS.map((region) => {
          const cx = (region.x / 100) * 360;
          const cy = (region.y / 100) * 320;
          const active = isHighlighted(region.id);
          return (
            <Circle
              key={region.id}
              cx={cx}
              cy={cy}
              r={active ? 5 : 3.5}
              fill={active ? '#FBBF24' : '#FFFFFF'}
              fillOpacity={active ? 0.9 : 0.6}
              stroke={active ? '#FBBF24' : '#94A3B8'}
              strokeWidth={active ? 1.5 : 0.8}
            />
          );
        })}

        {/* ============================================ */}
        {/* LABELS                                       */}
        {/* ============================================ */}
        {showLabels && (
          <G>
            {/* Anterior label */}
            <SvgText
              x={180} y={8}
              fill="#94A3B8"
              fontSize={8}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.7}
            >
              ANTERIOR
            </SvgText>

            {/* Posterior label */}
            <SvgText
              x={180} y={316}
              fill="#94A3B8"
              fontSize={8}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.7}
            >
              POSTERIOR
            </SvgText>

            {/* Longitudinal Fissure */}
            <SvgText
              x={180} y={165}
              fill="#94A3B8"
              fontSize={6.5}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.8}
              transform="rotate(-90, 180, 165)"
            >
              Longitudinal Fissure
            </SvgText>

            {/* Central Sulcus - left label */}
            <SvgText
              x={72} y={150}
              fill="#CBD5E1"
              fontSize={6}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.75}
              transform="rotate(-32, 72, 150)"
            >
              Central Sulcus
            </SvgText>

            {/* Central Sulcus - right label */}
            <SvgText
              x={288} y={150}
              fill="#CBD5E1"
              fontSize={6}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.75}
              transform="rotate(32, 288, 150)"
            >
              Central Sulcus
            </SvgText>

            {/* Left Frontal Lobe */}
            <SvgText
              x={115} y={68}
              fill="#93AAFD"
              fontSize={8}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.85}
            >
              Frontal
            </SvgText>
            <SvgText
              x={115} y={78}
              fill="#93AAFD"
              fontSize={7}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.75}
            >
              Lobe (L)
            </SvgText>

            {/* Right Frontal Lobe */}
            <SvgText
              x={245} y={68}
              fill="#93AAFD"
              fontSize={8}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.85}
            >
              Frontal
            </SvgText>
            <SvgText
              x={245} y={78}
              fill="#93AAFD"
              fontSize={7}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.75}
            >
              Lobe (R)
            </SvgText>

            {/* Left Parietal Lobe */}
            <SvgText
              x={115} y={176}
              fill="#67E8F9"
              fontSize={8}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.85}
            >
              Parietal
            </SvgText>
            <SvgText
              x={115} y={186}
              fill="#67E8F9"
              fontSize={7}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.75}
            >
              Lobe (L)
            </SvgText>

            {/* Right Parietal Lobe */}
            <SvgText
              x={245} y={176}
              fill="#67E8F9"
              fontSize={8}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.85}
            >
              Parietal
            </SvgText>
            <SvgText
              x={245} y={186}
              fill="#67E8F9"
              fontSize={7}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.75}
            >
              Lobe (R)
            </SvgText>

            {/* Left Occipital Lobe */}
            <SvgText
              x={138} y={262}
              fill="#F9A8D4"
              fontSize={7}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.85}
            >
              Occipital (L)
            </SvgText>

            {/* Right Occipital Lobe */}
            <SvgText
              x={222} y={262}
              fill="#F9A8D4"
              fontSize={7}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.85}
            >
              Occipital (R)
            </SvgText>

            {/* Motor Cortex label */}
            <SvgText
              x={30} y={128}
              fill="#C084FC"
              fontSize={5.5}
              fontWeight="600"
              textAnchor="start"
              opacity={0.8}
            >
              Motor Cortex
            </SvgText>
            <Line x1={74} y1={126} x2={88} y2={134} stroke="#C084FC" strokeWidth={0.5} opacity={0.6} />

            {/* Somatosensory Cortex label */}
            <SvgText
              x={30} y={152}
              fill="#F9A8D4"
              fontSize={5.5}
              fontWeight="600"
              textAnchor="start"
              opacity={0.8}
            >
              Somatosensory
            </SvgText>
            <Line x1={82} y1={150} x2={94} y2={146} stroke="#F9A8D4" strokeWidth={0.5} opacity={0.6} />

            {/* Superior Frontal Gyrus label */}
            <SvgText
              x={155} y={48}
              fill="#CBD5E1"
              fontSize={5}
              fontWeight="600"
              textAnchor="middle"
              opacity={0.65}
              transform="rotate(-72, 155, 48)"
            >
              Sup. Frontal G.
            </SvgText>

            {/* Left side indicator */}
            <SvgText
              x={28} y={164}
              fill="#64748B"
              fontSize={9}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.4}
            >
              L
            </SvgText>

            {/* Right side indicator */}
            <SvgText
              x={332} y={164}
              fill="#64748B"
              fontSize={9}
              fontWeight="bold"
              textAnchor="middle"
              opacity={0.4}
            >
              R
            </SvgText>
          </G>
        )}
      </Svg>

      {/* Touch overlays */}
      {SUPERIOR_REGIONS.map((region) => {
        const hitArea = REGION_HIT_AREAS[region.id];
        if (!hitArea) return null;
        return (
          <TouchableOpacity
            key={`touch_${region.id}`}
            style={[
              styles.touchOverlay,
              {
                left: hitArea.left,
                top: hitArea.top,
                width: hitArea.width,
                height: hitArea.height,
              },
            ]}
            activeOpacity={0.6}
            onPress={() => handlePress(region.id)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  touchOverlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
});
