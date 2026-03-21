import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
} from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Rect,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../utils/theme';

// ---------------------------------------------------------------------------
// Structure catalogue per slice – exported for quiz integration
// ---------------------------------------------------------------------------
export const SLICE_STRUCTURES = [
  {
    sliceIndex: 0,
    name: 'Superior',
    structures: [
      { id: 'superior_frontal_gyrus', name: 'Superior Frontal Gyrus', description: 'Upper part of the frontal lobe involved in self-awareness and executive function.' },
      { id: 'precentral_gyrus', name: 'Precentral Gyrus', description: 'Primary motor cortex controlling voluntary movement.' },
      { id: 'postcentral_gyrus', name: 'Postcentral Gyrus', description: 'Primary somatosensory cortex processing touch and proprioception.' },
      { id: 'longitudinal_fissure', name: 'Longitudinal Fissure', description: 'Deep groove separating the two cerebral hemispheres.' },
    ],
  },
  {
    sliceIndex: 1,
    name: 'High',
    structures: [
      { id: 'lateral_ventricles_high', name: 'Lateral Ventricles', description: 'CSF-filled cavities; small butterfly shape visible at this level.' },
      { id: 'corona_radiata', name: 'Corona Radiata', description: 'Fan-shaped white matter tracts projecting to the cortex.' },
      { id: 'corpus_callosum_high', name: 'Corpus Callosum', description: 'Largest white matter commissure connecting the hemispheres.' },
      { id: 'cingulate_gyrus', name: 'Cingulate Gyrus', description: 'Part of the limbic system involved in emotion and behavior.' },
    ],
  },
  {
    sliceIndex: 2,
    name: 'Mid-High (Lateral Ventricle)',
    structures: [
      { id: 'lateral_ventricles_mid', name: 'Lateral Ventricles', description: 'Larger crescent-shaped CSF spaces at this level.' },
      { id: 'caudate_nucleus', name: 'Caudate Nucleus', description: 'Part of the basal ganglia bordering the lateral ventricle.' },
      { id: 'corpus_callosum_mid', name: 'Corpus Callosum', description: 'White matter band connecting hemispheres, prominent at this level.' },
      { id: 'frontal_lobe', name: 'Frontal Lobe', description: 'Anterior lobe responsible for decision-making, planning, and motor function.' },
    ],
  },
  {
    sliceIndex: 3,
    name: 'Thalamus',
    structures: [
      { id: 'thalamus', name: 'Thalamus', description: 'Major relay station for sensory and motor signals to the cortex.' },
      { id: 'third_ventricle', name: 'Third Ventricle', description: 'Narrow CSF space between the two thalami.' },
      { id: 'internal_capsule', name: 'Internal Capsule', description: 'White matter tract between thalamus and basal ganglia.' },
      { id: 'putamen', name: 'Putamen', description: 'Part of the basal ganglia involved in motor control.' },
      { id: 'globus_pallidus', name: 'Globus Pallidus', description: 'Basal ganglia structure regulating voluntary movement.' },
      { id: 'insular_cortex', name: 'Insular Cortex', description: 'Deep cortical region involved in consciousness, emotion, and homeostasis.' },
    ],
  },
  {
    sliceIndex: 4,
    name: 'Hippocampus',
    structures: [
      { id: 'hippocampus', name: 'Hippocampus', description: 'Essential for memory formation and spatial navigation.' },
      { id: 'amygdala', name: 'Amygdala', description: 'Almond-shaped structure processing emotions, especially fear.' },
      { id: 'temporal_lobe', name: 'Temporal Lobe', description: 'Lobe involved in auditory processing, memory, and language.' },
      { id: 'cerebral_peduncles', name: 'Cerebral Peduncles', description: 'Midbrain tracts carrying motor information from cortex to brainstem.' },
      { id: 'occipital_lobe', name: 'Occipital Lobe', description: 'Posterior lobe responsible for visual processing.' },
    ],
  },
  {
    sliceIndex: 5,
    name: 'Brainstem (Pons)',
    structures: [
      { id: 'pons', name: 'Pons', description: 'Brainstem region relaying signals between cerebrum and cerebellum.' },
      { id: 'temporal_lobe_low', name: 'Temporal Lobes', description: 'Lateral portions of the brain at this inferior level.' },
      { id: 'cerebellum_upper', name: 'Cerebellum', description: 'Coordinates movement; visible posteriorly at this level.' },
      { id: 'fourth_ventricle', name: 'Fourth Ventricle', description: 'CSF-filled space between pons and cerebellum.' },
    ],
  },
  {
    sliceIndex: 6,
    name: 'Inferior (Cerebellum)',
    structures: [
      { id: 'cerebellum', name: 'Cerebellum', description: 'Large posterior structure coordinating balance and fine motor control.' },
      { id: 'vermis', name: 'Vermis', description: 'Midline structure of the cerebellum involved in posture and locomotion.' },
      { id: 'medulla_oblongata', name: 'Medulla Oblongata', description: 'Lowest brainstem structure controlling autonomic functions.' },
      { id: 'temporal_tips', name: 'Temporal Lobe Tips', description: 'Most inferior extent of the temporal lobes.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Colour constants
// ---------------------------------------------------------------------------
const C = {
  ventricle: '#0F1535',
  grayMatter: '#8B95A540',
  whiteMatter: '#C8CDD530',
  thalamus: '#FBBF2450',
  basalGanglia: '#FB923C50',
  hippocampus: '#2DD4BF50',
  amygdala: '#E879F950',
  corpusCallosum: '#38BDF850',
  cerebellum: '#FB923C50',
  brainstem: '#A78BFA50',
  outline: '#B0BEC5',
  grayMatterSolid: '#8B95A5',
  whiteMatterSolid: '#C8CDD5',
  label: '#E0E4EB',
  labelLine: '#90A4AE',
};

// ---------------------------------------------------------------------------
// Label helper – draws a line + text
// ---------------------------------------------------------------------------
const Label = ({ x, y, tx, ty, text, onPress, anchor = 'start' }) => (
  <G onPress={onPress}>
    <Line x1={x} y1={y} x2={tx} y2={ty} stroke={C.labelLine} strokeWidth={0.7} strokeDasharray="2,2" />
    <Circle cx={x} cy={y} r={2} fill={C.labelLine} />
    <SvgText
      x={tx}
      y={ty - 4}
      fill={C.label}
      fontSize={8}
      fontWeight="500"
      textAnchor={anchor}
    >
      {text}
    </SvgText>
  </G>
);

// ---------------------------------------------------------------------------
// Slice rendering functions
// ---------------------------------------------------------------------------

function renderSlice0(showLabels, onPress) {
  // Superior – cortex, longitudinal fissure, gyri
  return (
    <G>
      {/* Outer skull/brain */}
      <Ellipse cx={140} cy={145} rx={120} ry={105} fill={C.grayMatter} stroke={C.outline} strokeWidth={1.5} />
      {/* White matter interior */}
      <Ellipse cx={140} cy={145} rx={102} ry={88} fill={C.whiteMatter} />
      {/* Gray matter ring (re-draw outer for opacity layering) */}
      <Ellipse cx={140} cy={145} rx={120} ry={105} fill="none" stroke={C.grayMatterSolid} strokeWidth={16} strokeOpacity={0.25} />

      {/* Longitudinal fissure */}
      <Line x1={140} y1={42} x2={140} y2={248} stroke={C.ventricle} strokeWidth={2} />

      {/* Central sulcus (approximate) */}
      <Path
        d="M 90 100 Q 140 115 190 100"
        stroke={C.grayMatterSolid}
        strokeWidth={1.2}
        fill="none"
        strokeOpacity={0.6}
      />

      {/* Frontal lobe region (anterior) */}
      <Path
        d="M 60 95 Q 140 50 220 95"
        stroke={C.grayMatterSolid}
        strokeWidth={0.8}
        fill="none"
        strokeOpacity={0.4}
        strokeDasharray="4,3"
      />

      {/* Gyri outlines – precentral */}
      <Path
        d="M 95 100 Q 110 85 115 105"
        stroke={C.grayMatterSolid}
        strokeWidth={1}
        fill="none"
        strokeOpacity={0.5}
      />
      <Path
        d="M 165 100 Q 170 85 185 105"
        stroke={C.grayMatterSolid}
        strokeWidth={1}
        fill="none"
        strokeOpacity={0.5}
      />

      {/* Gyri outlines – postcentral */}
      <Path
        d="M 95 112 Q 108 125 115 110"
        stroke={C.grayMatterSolid}
        strokeWidth={1}
        fill="none"
        strokeOpacity={0.5}
      />
      <Path
        d="M 165 112 Q 172 125 185 110"
        stroke={C.grayMatterSolid}
        strokeWidth={1}
        fill="none"
        strokeOpacity={0.5}
      />

      {showLabels && (
        <G>
          <Label x={140} y={60} tx={200} ty={40} text="Longitudinal Fissure" onPress={() => onPress && onPress('longitudinal_fissure')} />
          <Label x={80} y={80} tx={20} ty={60} text="Sup. Frontal Gyrus" anchor="start" onPress={() => onPress && onPress('superior_frontal_gyrus')} />
          <Label x={110} y={102} tx={22} ty={112} text="Precentral Gyrus" anchor="start" onPress={() => onPress && onPress('precentral_gyrus')} />
          <Label x={175} y={118} tx={220} ty={130} text="Postcentral Gyrus" anchor="start" onPress={() => onPress && onPress('postcentral_gyrus')} />
        </G>
      )}
    </G>
  );
}

function renderSlice1(showLabels, onPress) {
  // High – lateral ventricles (small), corona radiata, corpus callosum, cingulate
  return (
    <G>
      <Ellipse cx={140} cy={145} rx={125} ry={108} fill={C.grayMatter} stroke={C.outline} strokeWidth={1.5} />
      <Ellipse cx={140} cy={145} rx={107} ry={91} fill={C.whiteMatter} />
      <Ellipse cx={140} cy={145} rx={125} ry={108} fill="none" stroke={C.grayMatterSolid} strokeWidth={16} strokeOpacity={0.25} />

      {/* Longitudinal fissure */}
      <Line x1={140} y1={39} x2={140} y2={251} stroke={C.ventricle} strokeWidth={1.8} />

      {/* Corpus callosum */}
      <Path
        d="M 95 135 Q 118 125 140 128 Q 162 125 185 135"
        stroke="#38BDF8"
        strokeWidth={4}
        fill={C.corpusCallosum}
        strokeOpacity={0.6}
      />

      {/* Lateral ventricles – small butterfly */}
      <Path
        d="M 115 140 Q 120 132 130 138 L 138 142 Q 135 148 125 148 Z"
        fill={C.ventricle}
      />
      <Path
        d="M 165 140 Q 160 132 150 138 L 142 142 Q 145 148 155 148 Z"
        fill={C.ventricle}
      />

      {/* Corona radiata (fan lines) */}
      <Path d="M 100 165 L 80 100" stroke={C.whiteMatterSolid} strokeWidth={0.6} strokeOpacity={0.4} />
      <Path d="M 120 160 L 105 90" stroke={C.whiteMatterSolid} strokeWidth={0.6} strokeOpacity={0.4} />
      <Path d="M 160 160 L 175 90" stroke={C.whiteMatterSolid} strokeWidth={0.6} strokeOpacity={0.4} />
      <Path d="M 180 165 L 200 100" stroke={C.whiteMatterSolid} strokeWidth={0.6} strokeOpacity={0.4} />

      {/* Cingulate gyrus (arched band above corpus callosum) */}
      <Path
        d="M 85 130 Q 112 108 140 112 Q 168 108 195 130"
        stroke={C.grayMatterSolid}
        strokeWidth={3}
        fill="none"
        strokeOpacity={0.35}
      />

      {showLabels && (
        <G>
          <Label x={127} y={140} tx={22} ty={140} text="Lat. Ventricles" onPress={() => onPress && onPress('lateral_ventricles_high')} />
          <Label x={140} y={128} tx={200} ty={115} text="Corpus Callosum" onPress={() => onPress && onPress('corpus_callosum_high')} />
          <Label x={120} y={115} tx={22} ty={105} text="Cingulate Gyrus" onPress={() => onPress && onPress('cingulate_gyrus')} />
          <Label x={160} y={160} tx={210} ty={165} text="Corona Radiata" onPress={() => onPress && onPress('corona_radiata')} />
        </G>
      )}
    </G>
  );
}

function renderSlice2(showLabels, onPress) {
  // Mid-high – larger ventricles, caudate nucleus, corpus callosum
  return (
    <G>
      <Ellipse cx={140} cy={145} rx={128} ry={110} fill={C.grayMatter} stroke={C.outline} strokeWidth={1.5} />
      <Ellipse cx={140} cy={145} rx={110} ry={93} fill={C.whiteMatter} />
      <Ellipse cx={140} cy={145} rx={128} ry={110} fill="none" stroke={C.grayMatterSolid} strokeWidth={16} strokeOpacity={0.25} />

      {/* Longitudinal fissure */}
      <Line x1={140} y1={37} x2={140} y2={253} stroke={C.ventricle} strokeWidth={1.5} />

      {/* Corpus callosum – wider band */}
      <Path
        d="M 80 140 Q 110 126 140 130 Q 170 126 200 140"
        stroke="#38BDF8"
        strokeWidth={5}
        fill={C.corpusCallosum}
        strokeOpacity={0.6}
      />

      {/* Lateral ventricles – larger crescent shapes */}
      {/* Left ventricle */}
      <Path
        d="M 100 145 Q 108 130 125 135 L 137 142 L 137 150 Q 130 160 118 162 Q 105 158 100 150 Z"
        fill={C.ventricle}
      />
      {/* Right ventricle */}
      <Path
        d="M 180 145 Q 172 130 155 135 L 143 142 L 143 150 Q 150 160 162 162 Q 175 158 180 150 Z"
        fill={C.ventricle}
      />

      {/* Caudate nucleus – along ventricle walls */}
      <Path
        d="M 103 143 Q 110 133 123 136 L 118 140 Q 110 138 106 145 Z"
        fill={C.basalGanglia}
        stroke="#FB923C"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Path
        d="M 177 143 Q 170 133 157 136 L 162 140 Q 170 138 174 145 Z"
        fill={C.basalGanglia}
        stroke="#FB923C"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />

      {/* Frontal lobe label region */}
      <Path
        d="M 50 110 Q 140 55 230 110"
        stroke={C.grayMatterSolid}
        strokeWidth={0.7}
        fill="none"
        strokeOpacity={0.3}
        strokeDasharray="4,3"
      />

      {showLabels && (
        <G>
          <Label x={120} y={148} tx={20} ty={155} text="Lat. Ventricles" onPress={() => onPress && onPress('lateral_ventricles_mid')} />
          <Label x={110} y={138} tx={20} ty={120} text="Caudate Nucleus" onPress={() => onPress && onPress('caudate_nucleus')} />
          <Label x={140} y={130} tx={200} ty={118} text="Corpus Callosum" onPress={() => onPress && onPress('corpus_callosum_mid')} />
          <Label x={85} y={85} tx={20} ty={75} text="Frontal Lobe" onPress={() => onPress && onPress('frontal_lobe')} />
        </G>
      )}
    </G>
  );
}

function renderSlice3(showLabels, onPress) {
  // Middle – Thalamus level (most important)
  return (
    <G>
      <Ellipse cx={140} cy={145} rx={130} ry={112} fill={C.grayMatter} stroke={C.outline} strokeWidth={1.5} />
      <Ellipse cx={140} cy={145} rx={112} ry={95} fill={C.whiteMatter} />
      <Ellipse cx={140} cy={145} rx={130} ry={112} fill="none" stroke={C.grayMatterSolid} strokeWidth={16} strokeOpacity={0.25} />

      {/* Longitudinal fissure (shorter at this level) */}
      <Line x1={140} y1={35} x2={140} y2={120} stroke={C.ventricle} strokeWidth={1.5} />
      <Line x1={140} y1={175} x2={140} y2={255} stroke={C.ventricle} strokeWidth={1.5} />

      {/* Thalamus – bilateral oval structures */}
      <Ellipse cx={118} cy={148} rx={22} ry={16} fill={C.thalamus} stroke="#FBBF24" strokeWidth={1.2} strokeOpacity={0.6} />
      <Ellipse cx={162} cy={148} rx={22} ry={16} fill={C.thalamus} stroke="#FBBF24" strokeWidth={1.2} strokeOpacity={0.6} />

      {/* Third ventricle – narrow slit between thalami */}
      <Rect x={138} y={135} width={4} height={26} rx={2} fill={C.ventricle} />

      {/* Internal capsule – white matter V shapes */}
      <Path
        d="M 93 135 L 98 148 L 93 162"
        stroke={C.whiteMatterSolid}
        strokeWidth={4}
        fill="none"
        strokeOpacity={0.5}
      />
      <Path
        d="M 187 135 L 182 148 L 187 162"
        stroke={C.whiteMatterSolid}
        strokeWidth={4}
        fill="none"
        strokeOpacity={0.5}
      />

      {/* Putamen */}
      <Path
        d="M 70 135 Q 75 125 85 128 L 90 148 L 85 168 Q 75 170 70 160 Z"
        fill={C.basalGanglia}
        stroke="#FB923C"
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      <Path
        d="M 210 135 Q 205 125 195 128 L 190 148 L 195 168 Q 205 170 210 160 Z"
        fill={C.basalGanglia}
        stroke="#FB923C"
        strokeWidth={1}
        strokeOpacity={0.5}
      />

      {/* Globus pallidus (medial to putamen) */}
      <Path
        d="M 85 135 Q 88 130 93 133 L 95 148 L 93 163 Q 88 166 85 160 Z"
        fill={C.basalGanglia}
        stroke="#FB923C"
        strokeWidth={0.8}
        strokeOpacity={0.4}
      />
      <Path
        d="M 195 135 Q 192 130 187 133 L 185 148 L 187 163 Q 192 166 195 160 Z"
        fill={C.basalGanglia}
        stroke="#FB923C"
        strokeWidth={0.8}
        strokeOpacity={0.4}
      />

      {/* Lateral ventricles – temporal horns (small) */}
      <Path
        d="M 85 170 Q 95 175 105 172 Q 100 180 88 178 Z"
        fill={C.ventricle}
      />
      <Path
        d="M 195 170 Q 185 175 175 172 Q 180 180 192 178 Z"
        fill={C.ventricle}
      />

      {/* Insular cortex (lateral, deep) */}
      <Path
        d="M 45 130 Q 50 120 55 125 L 58 145 L 55 165 Q 50 170 45 160 Z"
        fill={C.grayMatter}
        stroke={C.grayMatterSolid}
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Path
        d="M 235 130 Q 230 120 225 125 L 222 145 L 225 165 Q 230 170 235 160 Z"
        fill={C.grayMatter}
        stroke={C.grayMatterSolid}
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />

      {/* Lobe dividers (dashed) */}
      <Path d="M 30 125 Q 60 95 90 110" stroke={C.grayMatterSolid} strokeWidth={0.6} strokeOpacity={0.3} strokeDasharray="3,3" fill="none" />
      <Path d="M 250 125 Q 220 95 190 110" stroke={C.grayMatterSolid} strokeWidth={0.6} strokeOpacity={0.3} strokeDasharray="3,3" fill="none" />

      {showLabels && (
        <G>
          <Label x={118} y={148} tx={15} ty={148} text="Thalamus" onPress={() => onPress && onPress('thalamus')} />
          <Label x={140} y={148} tx={200} ty={140} text="3rd Ventricle" onPress={() => onPress && onPress('third_ventricle')} />
          <Label x={93} y={148} tx={15} ty={115} text="Int. Capsule" onPress={() => onPress && onPress('internal_capsule')} />
          <Label x={77} y={148} tx={15} ty={180} text="Putamen" onPress={() => onPress && onPress('putamen')} />
          <Label x={89} y={150} tx={15} ty={200} text="Globus Pallidus" onPress={() => onPress && onPress('globus_pallidus')} />
          <Label x={50} y={145} tx={15} ty={230} text="Insular Cortex" onPress={() => onPress && onPress('insular_cortex')} />
        </G>
      )}
    </G>
  );
}

function renderSlice4(showLabels, onPress) {
  // Low-mid – Hippocampus level
  return (
    <G>
      <Ellipse cx={140} cy={148} rx={128} ry={108} fill={C.grayMatter} stroke={C.outline} strokeWidth={1.5} />
      <Ellipse cx={140} cy={148} rx={110} ry={91} fill={C.whiteMatter} />
      <Ellipse cx={140} cy={148} rx={128} ry={108} fill="none" stroke={C.grayMatterSolid} strokeWidth={16} strokeOpacity={0.25} />

      {/* Longitudinal fissure */}
      <Line x1={140} y1={42} x2={140} y2={254} stroke={C.ventricle} strokeWidth={1.2} />

      {/* Cerebral peduncles (midbrain) */}
      <Ellipse cx={125} cy={155} rx={12} ry={10} fill={C.brainstem} stroke="#A78BFA" strokeWidth={1} strokeOpacity={0.5} />
      <Ellipse cx={155} cy={155} rx={12} ry={10} fill={C.brainstem} stroke="#A78BFA" strokeWidth={1} strokeOpacity={0.5} />

      {/* Hippocampus – curved structures in temporal lobes */}
      <Path
        d="M 60 165 Q 70 150 85 155 Q 95 158 100 170 Q 95 180 80 178 Q 65 175 60 165 Z"
        fill={C.hippocampus}
        stroke="#2DD4BF"
        strokeWidth={1.2}
        strokeOpacity={0.6}
      />
      <Path
        d="M 220 165 Q 210 150 195 155 Q 185 158 180 170 Q 185 180 200 178 Q 215 175 220 165 Z"
        fill={C.hippocampus}
        stroke="#2DD4BF"
        strokeWidth={1.2}
        strokeOpacity={0.6}
      />

      {/* Amygdala – anterior to hippocampus */}
      <Ellipse cx={72} cy={148} rx={10} ry={9} fill={C.amygdala} stroke="#E879F9" strokeWidth={1} strokeOpacity={0.6} />
      <Ellipse cx={208} cy={148} rx={10} ry={9} fill={C.amygdala} stroke="#E879F9" strokeWidth={1} strokeOpacity={0.6} />

      {/* Temporal lobe emphasis */}
      <Path
        d="M 30 130 Q 25 150 30 175 Q 45 200 70 195"
        stroke={C.grayMatterSolid}
        strokeWidth={0.7}
        fill="none"
        strokeOpacity={0.4}
        strokeDasharray="4,3"
      />
      <Path
        d="M 250 130 Q 255 150 250 175 Q 235 200 210 195"
        stroke={C.grayMatterSolid}
        strokeWidth={0.7}
        fill="none"
        strokeOpacity={0.4}
        strokeDasharray="4,3"
      />

      {/* Occipital lobe region at back */}
      <Path
        d="M 100 230 Q 140 250 180 230"
        stroke={C.grayMatterSolid}
        strokeWidth={0.7}
        fill="none"
        strokeOpacity={0.4}
        strokeDasharray="4,3"
      />

      {showLabels && (
        <G>
          <Label x={80} y={168} tx={10} ty={190} text="Hippocampus" onPress={() => onPress && onPress('hippocampus')} />
          <Label x={72} y={148} tx={10} ty={130} text="Amygdala" onPress={() => onPress && onPress('amygdala')} />
          <Label x={40} y={155} tx={10} ty={215} text="Temporal Lobe" onPress={() => onPress && onPress('temporal_lobe')} />
          <Label x={140} y={155} tx={200} ty={150} text="Cerebral Peduncles" onPress={() => onPress && onPress('cerebral_peduncles')} />
          <Label x={140} y={240} tx={200} ty={245} text="Occipital Lobe" onPress={() => onPress && onPress('occipital_lobe')} />
        </G>
      )}
    </G>
  );
}

function renderSlice5(showLabels, onPress) {
  // Low – Brainstem (pons) level
  return (
    <G>
      {/* Slightly smaller overall outline at this level */}
      <Ellipse cx={140} cy={150} rx={118} ry={100} fill={C.grayMatter} stroke={C.outline} strokeWidth={1.5} />
      <Ellipse cx={140} cy={150} rx={100} ry={84} fill={C.whiteMatter} />
      <Ellipse cx={140} cy={150} rx={118} ry={100} fill="none" stroke={C.grayMatterSolid} strokeWidth={14} strokeOpacity={0.25} />

      {/* Pons – rounded structure in center */}
      <Ellipse cx={140} cy={148} rx={22} ry={18} fill={C.brainstem} stroke="#A78BFA" strokeWidth={1.5} strokeOpacity={0.6} />

      {/* Fourth ventricle (behind pons) */}
      <Path
        d="M 132 170 Q 140 180 148 170 Q 145 175 140 178 Q 135 175 132 170 Z"
        fill={C.ventricle}
      />

      {/* Cerebellum at back */}
      <Path
        d="M 80 190 Q 90 175 110 180 Q 130 185 140 190 Q 150 185 170 180 Q 190 175 200 190 Q 195 215 170 225 Q 140 235 110 225 Q 85 215 80 190 Z"
        fill={C.cerebellum}
        stroke="#FB923C"
        strokeWidth={1.2}
        strokeOpacity={0.5}
      />
      {/* Cerebellar folia (lines) */}
      <Path d="M 95 200 Q 140 210 185 200" stroke="#FB923C" strokeWidth={0.5} strokeOpacity={0.3} fill="none" />
      <Path d="M 100 210 Q 140 220 180 210" stroke="#FB923C" strokeWidth={0.5} strokeOpacity={0.3} fill="none" />

      {/* Temporal lobes on sides */}
      <Ellipse cx={55} cy={140} rx={30} ry={35} fill={C.grayMatter} stroke={C.grayMatterSolid} strokeWidth={0.6} strokeOpacity={0.3} />
      <Ellipse cx={225} cy={140} rx={30} ry={35} fill={C.grayMatter} stroke={C.grayMatterSolid} strokeWidth={0.6} strokeOpacity={0.3} />

      {showLabels && (
        <G>
          <Label x={140} y={148} tx={200} ty={130} text="Pons" onPress={() => onPress && onPress('pons')} />
          <Label x={55} y={140} tx={10} ty={110} text="Temporal Lobe" onPress={() => onPress && onPress('temporal_lobe_low')} />
          <Label x={140} y={200} tx={200} ty={210} text="Cerebellum" onPress={() => onPress && onPress('cerebellum_upper')} />
          <Label x={140} y={175} tx={200} ty={175} text="4th Ventricle" onPress={() => onPress && onPress('fourth_ventricle')} />
        </G>
      )}
    </G>
  );
}

function renderSlice6(showLabels, onPress) {
  // Inferior – Cerebellum prominent
  return (
    <G>
      {/* Smaller brain outline at most inferior level */}
      <Ellipse cx={140} cy={150} rx={110} ry={95} fill={C.grayMatter} stroke={C.outline} strokeWidth={1.5} />
      <Ellipse cx={140} cy={150} rx={93} ry={78} fill={C.whiteMatter} />
      <Ellipse cx={140} cy={150} rx={110} ry={95} fill="none" stroke={C.grayMatterSolid} strokeWidth={14} strokeOpacity={0.25} />

      {/* Cerebellum – large posterior structure */}
      <Path
        d="M 60 170 Q 70 150 100 155 Q 130 158 140 162 Q 150 158 180 155 Q 210 150 220 170 Q 218 205 195 220 Q 165 240 140 242 Q 115 240 85 220 Q 62 205 60 170 Z"
        fill={C.cerebellum}
        stroke="#FB923C"
        strokeWidth={1.5}
        strokeOpacity={0.5}
      />

      {/* Vermis (midline cerebellar structure) */}
      <Path
        d="M 130 162 Q 135 158 140 160 Q 145 158 150 162 L 148 230 Q 140 240 132 230 Z"
        fill={C.cerebellum}
        stroke="#FB923C"
        strokeWidth={1}
        strokeOpacity={0.7}
      />

      {/* Cerebellar folia */}
      <Path d="M 75 180 Q 105 190 130 185" stroke="#FB923C" strokeWidth={0.5} strokeOpacity={0.3} fill="none" />
      <Path d="M 150 185 Q 175 190 205 180" stroke="#FB923C" strokeWidth={0.5} strokeOpacity={0.3} fill="none" />
      <Path d="M 80 195 Q 110 205 130 200" stroke="#FB923C" strokeWidth={0.5} strokeOpacity={0.3} fill="none" />
      <Path d="M 150 200 Q 170 205 200 195" stroke="#FB923C" strokeWidth={0.5} strokeOpacity={0.3} fill="none" />
      <Path d="M 90 210 Q 110 218 130 215" stroke="#FB923C" strokeWidth={0.5} strokeOpacity={0.3} fill="none" />
      <Path d="M 150 215 Q 170 218 190 210" stroke="#FB923C" strokeWidth={0.5} strokeOpacity={0.3} fill="none" />

      {/* Medulla oblongata */}
      <Ellipse cx={140} cy={150} rx={14} ry={12} fill={C.brainstem} stroke="#A78BFA" strokeWidth={1.2} strokeOpacity={0.6} />

      {/* Temporal lobe tips */}
      <Ellipse cx={48} cy={130} rx={22} ry={28} fill={C.grayMatter} stroke={C.grayMatterSolid} strokeWidth={0.6} strokeOpacity={0.3} />
      <Ellipse cx={232} cy={130} rx={22} ry={28} fill={C.grayMatter} stroke={C.grayMatterSolid} strokeWidth={0.6} strokeOpacity={0.3} />

      {showLabels && (
        <G>
          <Label x={100} y={190} tx={10} ty={200} text="Cerebellum" onPress={() => onPress && onPress('cerebellum')} />
          <Label x={140} y={195} tx={200} ty={195} text="Vermis" onPress={() => onPress && onPress('vermis')} />
          <Label x={140} y={150} tx={200} ty={140} text="Medulla Oblongata" onPress={() => onPress && onPress('medulla_oblongata')} />
          <Label x={48} y={130} tx={10} ty={100} text="Temporal Tips" onPress={() => onPress && onPress('temporal_tips')} />
        </G>
      )}
    </G>
  );
}

const SLICE_RENDERERS = [
  renderSlice0,
  renderSlice1,
  renderSlice2,
  renderSlice3,
  renderSlice4,
  renderSlice5,
  renderSlice6,
];

const SLICE_NAMES = [
  'Superior (Top)',
  'High',
  'Mid-High (Lateral Ventricle)',
  'Middle (Thalamus)',
  'Low-Mid (Hippocampus)',
  'Low (Brainstem)',
  'Inferior (Cerebellum)',
];

// ---------------------------------------------------------------------------
// SliceViewer component
// ---------------------------------------------------------------------------
const SliceViewer = ({
  width = 340,
  height = 400,
  showLabels = true,
  onStructurePress,
}) => {
  const [currentSlice, setCurrentSlice] = useState(3); // default to thalamus
  const sliderWidth = width - 48;
  const knobSize = 22;

  // Custom slider via PanResponder
  const panRef = useRef(null);
  const sliderXFromSlice = (s) => (s / 6) * (sliderWidth - knobSize);

  const [sliderX, setSliderX] = useState(sliderXFromSlice(3));

  const updateSliceFromX = (x) => {
    const clamped = Math.max(0, Math.min(x, sliderWidth - knobSize));
    setSliderX(clamped);
    const slice = Math.round((clamped / (sliderWidth - knobSize)) * 6);
    setCurrentSlice(slice);
  };

  if (!panRef.current) {
    panRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gs) => {
        // nothing special needed
      },
      onPanResponderMove: (evt, gs) => {
        const touchX = gs.moveX;
        // We'll use dx from grant instead; simpler: use locationX approach
        // Since we can't reliably get offset, track relative:
        const newX = sliderX + gs.dx;
        updateSliceFromX(newX);
      },
      onPanResponderRelease: () => {},
    });
  }

  const handleSliderPress = (evt) => {
    const locationX = evt.nativeEvent.locationX;
    updateSliceFromX(locationX - knobSize / 2);
  };

  const goToSlice = (dir) => {
    const next = Math.max(0, Math.min(6, currentSlice + dir));
    setCurrentSlice(next);
    setSliderX(sliderXFromSlice(next));
  };

  const structures = SLICE_STRUCTURES[currentSlice].structures;

  return (
    <View style={[styles.container, { width }]}>
      {/* Title */}
      <Text style={styles.title}>
        Axial Slice - {SLICE_NAMES[currentSlice]}
      </Text>

      {/* SVG Slice */}
      <View style={styles.svgContainer}>
        <Svg width={280} height={280} viewBox="0 0 280 280">
          {/* Dark MRI background */}
          <Rect x={0} y={0} width={280} height={280} rx={8} fill="#080C1E" />
          {SLICE_RENDERERS[currentSlice](showLabels, onStructurePress)}
        </Svg>
      </View>

      {/* Slider area */}
      <View style={styles.sliderRow}>
        <TouchableOpacity
          onPress={() => goToSlice(-1)}
          style={styles.arrowBtn}
          disabled={currentSlice === 0}
        >
          <Text style={[styles.arrowText, currentSlice === 0 && styles.arrowDisabled]}>
            {'<'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={handleSliderPress}
          style={[styles.sliderTrack, { width: sliderWidth }]}
        >
          {/* Track marks */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const markX = (i / 6) * (sliderWidth - knobSize) + knobSize / 2;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setCurrentSlice(i);
                  setSliderX(sliderXFromSlice(i));
                }}
                style={[
                  styles.tickMark,
                  {
                    left: markX - 3,
                  },
                  i === currentSlice && styles.tickMarkActive,
                ]}
              />
            );
          })}
          {/* Filled portion */}
          <View
            style={[
              styles.sliderFill,
              { width: sliderX + knobSize / 2 },
            ]}
          />
          {/* Knob */}
          <View
            style={[
              styles.sliderKnob,
              {
                left: sliderX,
                width: knobSize,
                height: knobSize,
                borderRadius: knobSize / 2,
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => goToSlice(1)}
          style={styles.arrowBtn}
          disabled={currentSlice === 6}
        >
          <Text style={[styles.arrowText, currentSlice === 6 && styles.arrowDisabled]}>
            {'>'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Slice indicator */}
      <Text style={styles.sliceIndicator}>
        Slice {currentSlice + 1} / 7
      </Text>

      {/* Structure list */}
      <View style={styles.structureList}>
        <Text style={styles.structureHeader}>Visible Structures:</Text>
        {structures.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={styles.structureItem}
            onPress={() => onStructurePress && onStructurePress(s.id)}
          >
            <Text style={styles.structureDot}>{'\u2022'}</Text>
            <View style={styles.structureTextWrap}>
              <Text style={styles.structureName}>{s.name}</Text>
              <Text style={styles.structureDesc} numberOfLines={2}>
                {s.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.darkNavy,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  arrowDisabled: {
    color: COLORS.textMuted,
  },
  sliderTrack: {
    height: 24,
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: COLORS.surfaceLighter,
    borderRadius: 12,
    marginHorizontal: SPACING.xs,
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.glowBlue,
    borderRadius: 12,
    opacity: 0.35,
  },
  sliderKnob: {
    position: 'absolute',
    top: 1,
    backgroundColor: COLORS.electricBlue,
    borderWidth: 2,
    borderColor: COLORS.textPrimary,
    elevation: 3,
    shadowColor: COLORS.electricBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  tickMark: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
    top: 9,
  },
  tickMarkActive: {
    backgroundColor: COLORS.electricBlue,
  },
  sliceIndicator: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  structureList: {
    width: '100%',
    paddingHorizontal: SPACING.sm,
  },
  structureHeader: {
    color: COLORS.textAccent,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    marginBottom: SPACING.xs,
  },
  structureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
    paddingVertical: 2,
  },
  structureDot: {
    color: COLORS.electricBlue,
    fontSize: FONTS.sizes.sm,
    marginRight: SPACING.xs,
    marginTop: 1,
  },
  structureTextWrap: {
    flex: 1,
  },
  structureName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  structureDesc: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    lineHeight: 15,
  },
});

export default SliceViewer;
