import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Ellipse,
  Rect,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

export const SYNAPSE_PARTS = [
  {
    id: 'presynaptic_terminal',
    name: 'Presynaptic Terminal',
    description:
      'The axon terminal of the sending neuron; contains vesicles filled with neurotransmitter',
  },
  {
    id: 'synaptic_vesicles',
    name: 'Synaptic Vesicles',
    description: 'Membrane-bound sacs that store neurotransmitter molecules',
  },
  {
    id: 'calcium_channels',
    name: 'Calcium Channels',
    description:
      'Voltage-gated channels that open when an action potential arrives, allowing Ca²⁺ to trigger vesicle fusion',
  },
  {
    id: 'synaptic_cleft',
    name: 'Synaptic Cleft',
    description: 'The ~20nm gap between the pre- and postsynaptic neurons',
  },
  {
    id: 'neurotransmitters',
    name: 'Neurotransmitters',
    description:
      'Chemical messengers released from vesicles that cross the cleft to bind receptors',
  },
  {
    id: 'receptors',
    name: 'Receptors',
    description:
      'Proteins on the postsynaptic membrane that bind neurotransmitters, opening ion channels or triggering signaling cascades',
  },
  {
    id: 'postsynaptic_membrane',
    name: 'Postsynaptic Membrane',
    description:
      'The receiving neuron surface containing receptors; generates excitatory or inhibitory postsynaptic potentials',
  },
  {
    id: 'reuptake_pump',
    name: 'Reuptake Pump',
    description:
      'Transporter proteins that reabsorb neurotransmitter back into the presynaptic terminal',
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    description:
      'Organelles that provide ATP energy for neurotransmitter synthesis and vesicle recycling',
  },
];

const COLORS = {
  presynaptic_terminal: '#4C6EF5',
  synaptic_vesicles: '#A78BFA',
  neurotransmitters: '#FBBF24',
  calcium_channels: '#FB923C',
  synaptic_cleft: '#1A2350',
  receptors: '#22D3EE',
  postsynaptic_membrane: '#4ADE80',
  reuptake_pump: '#F472B6',
  mitochondria: '#F87171',
  label: '#FFFFFF',
  labelLine: '#64748B',
};

const HIGHLIGHT_OPACITY = 1.0;
const DIM_OPACITY = 0.35;

function getOpacity(partId, highlightedParts) {
  if (!highlightedParts || highlightedParts.length === 0) return 1;
  return highlightedParts.includes(partId) ? HIGHLIGHT_OPACITY : DIM_OPACITY;
}

function LabelWithLine({ x1, y1, x2, y2, label, anchor = 'start', visible }) {
  if (!visible) return null;
  return (
    <G>
      <Line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={COLORS.labelLine}
        strokeWidth={1}
        strokeDasharray="3,2"
      />
      <Circle cx={x1} cy={y1} r={2} fill={COLORS.labelLine} />
      <SvgText
        x={x2}
        y={y2}
        fill={COLORS.label}
        fontSize={8}
        fontWeight="600"
        textAnchor={anchor}
      >
        {label}
      </SvgText>
    </G>
  );
}

const SynapseDiagram = ({
  width = 350,
  height = 320,
  showLabels = true,
  highlightedParts = [],
  onPartPress,
}) => {
  const scaleX = width / 350;
  const scaleY = height / 320;

  const handlePress = (partId) => {
    if (onPartPress) {
      onPartPress(partId);
    }
  };

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 350 320">
        <Defs>
          <LinearGradient id="presynGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#6B8AFF" />
            <Stop offset="1" stopColor="#3B5BDB" />
          </LinearGradient>
          <LinearGradient id="postsynGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#4ADE80" />
            <Stop offset="1" stopColor="#22C55E" />
          </LinearGradient>
          <LinearGradient id="mitoGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FCA5A5" />
            <Stop offset="1" stopColor="#EF4444" />
          </LinearGradient>
        </Defs>

        {/* Background */}
        <Rect x={0} y={0} width={350} height={320} fill="#0F172A" rx={8} />

        {/* ===== PRESYNAPTIC TERMINAL (bulb shape) ===== */}
        <G opacity={getOpacity('presynaptic_terminal', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('presynaptic_terminal')}>
            {/* Axon stalk coming from top */}
            <Rect
              x={155}
              y={0}
              width={40}
              height={30}
              fill="url(#presynGrad)"
            />
            {/* Main bulb body */}
            <Path
              d="M 75 30 Q 75 5, 175 5 Q 275 5, 275 30 L 275 145 Q 275 160, 175 160 Q 75 160, 75 145 Z"
              fill="url(#presynGrad)"
              stroke="#7C9AFF"
              strokeWidth={1.5}
            />
            {/* Inner membrane highlight */}
            <Path
              d="M 90 35 Q 90 18, 175 18 Q 260 18, 260 35 L 260 138 Q 260 150, 175 150 Q 90 150, 90 138 Z"
              fill="#3B5BDB"
              opacity={0.4}
            />
          </TouchableOpacity>
        </G>

        {/* ===== MITOCHONDRIA (inside terminal, upper area) ===== */}
        <G opacity={getOpacity('mitochondria', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('mitochondria')}>
            {/* Outer membrane */}
            <Ellipse
              cx={215}
              cy={55}
              rx={30}
              ry={14}
              fill="url(#mitoGrad)"
              stroke="#FCA5A5"
              strokeWidth={1}
            />
            {/* Inner cristae folds */}
            <Path
              d="M 195 55 Q 200 47, 210 52 Q 215 45, 225 52 Q 230 47, 235 55"
              fill="none"
              stroke="#7F1D1D"
              strokeWidth={1.2}
            />
            <Path
              d="M 195 57 Q 200 63, 210 58 Q 215 65, 225 58 Q 230 63, 235 57"
              fill="none"
              stroke="#7F1D1D"
              strokeWidth={1.2}
            />
          </TouchableOpacity>
        </G>

        {/* ===== SYNAPTIC VESICLES (small circles in terminal) ===== */}
        <G opacity={getOpacity('synaptic_vesicles', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('synaptic_vesicles')}>
            {/* Vesicles scattered in the terminal */}
            {/* Row 1 - upper */}
            <Circle cx={120} cy={50} r={9} fill={COLORS.synaptic_vesicles} opacity={0.85} stroke="#C4B5FD" strokeWidth={0.8} />
            <Circle cx={105} cy={70} r={9} fill={COLORS.synaptic_vesicles} opacity={0.85} stroke="#C4B5FD" strokeWidth={0.8} />
            <Circle cx={140} cy={68} r={9} fill={COLORS.synaptic_vesicles} opacity={0.85} stroke="#C4B5FD" strokeWidth={0.8} />
            {/* Row 2 - middle */}
            <Circle cx={155} cy={90} r={9} fill={COLORS.synaptic_vesicles} opacity={0.9} stroke="#C4B5FD" strokeWidth={0.8} />
            <Circle cx={130} cy={95} r={9} fill={COLORS.synaptic_vesicles} opacity={0.9} stroke="#C4B5FD" strokeWidth={0.8} />
            <Circle cx={180} cy={85} r={9} fill={COLORS.synaptic_vesicles} opacity={0.85} stroke="#C4B5FD" strokeWidth={0.8} />
            {/* Row 3 - near membrane, docking */}
            <Circle cx={145} cy={118} r={9} fill={COLORS.synaptic_vesicles} opacity={0.95} stroke="#C4B5FD" strokeWidth={0.8} />
            <Circle cx={170} cy={115} r={9} fill={COLORS.synaptic_vesicles} opacity={0.95} stroke="#C4B5FD" strokeWidth={0.8} />
            <Circle cx={200} cy={120} r={9} fill={COLORS.synaptic_vesicles} opacity={0.9} stroke="#C4B5FD" strokeWidth={0.8} />
            {/* Neurotransmitter dots inside vesicles */}
            <Circle cx={120} cy={50} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
            <Circle cx={105} cy={70} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
            <Circle cx={140} cy={68} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
            <Circle cx={155} cy={90} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
            <Circle cx={130} cy={95} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
            <Circle cx={180} cy={85} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
            <Circle cx={145} cy={118} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
            <Circle cx={170} cy={115} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
            <Circle cx={200} cy={120} r={3} fill={COLORS.neurotransmitters} opacity={0.7} />
          </TouchableOpacity>
        </G>

        {/* ===== CALCIUM CHANNELS (on presynaptic membrane, bottom edge) ===== */}
        <G opacity={getOpacity('calcium_channels', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('calcium_channels')}>
            {/* Channel 1 */}
            <Rect x={108} y={148} width={6} height={16} rx={2} fill={COLORS.calcium_channels} />
            <Rect x={118} y={148} width={6} height={16} rx={2} fill={COLORS.calcium_channels} />
            {/* Channel 2 */}
            <Rect x={218} y={148} width={6} height={16} rx={2} fill={COLORS.calcium_channels} />
            <Rect x={228} y={148} width={6} height={16} rx={2} fill={COLORS.calcium_channels} />
            {/* Ca2+ label indicators */}
            <SvgText x={113} y={174} fill={COLORS.calcium_channels} fontSize={6} textAnchor="middle" fontWeight="bold">
              Ca²⁺
            </SvgText>
            <SvgText x={223} y={174} fill={COLORS.calcium_channels} fontSize={6} textAnchor="middle" fontWeight="bold">
              Ca²⁺
            </SvgText>
          </TouchableOpacity>
        </G>

        {/* ===== REUPTAKE PUMP (on presynaptic membrane side) ===== */}
        <G opacity={getOpacity('reuptake_pump', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('reuptake_pump')}>
            {/* Pump body straddling the membrane */}
            <Path
              d="M 250 140 L 258 140 L 262 148 L 262 164 L 258 172 L 250 172 L 246 164 L 246 148 Z"
              fill={COLORS.reuptake_pump}
              stroke="#FDA4CC"
              strokeWidth={1}
            />
            {/* Arrow indicating reuptake direction */}
            <Path
              d="M 254 170 L 254 144 M 251 148 L 254 142 L 257 148"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={1.2}
            />
          </TouchableOpacity>
        </G>

        {/* ===== SYNAPTIC CLEFT (the gap) ===== */}
        <G opacity={getOpacity('synaptic_cleft', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('synaptic_cleft')}>
            <Rect
              x={75}
              y={165}
              width={200}
              height={45}
              fill={COLORS.synaptic_cleft}
              opacity={0.6}
            />
          </TouchableOpacity>
        </G>

        {/* ===== NEUROTRANSMITTERS (released into cleft) ===== */}
        <G opacity={getOpacity('neurotransmitters', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('neurotransmitters')}>
            {/* Neurotransmitter molecules floating in the cleft */}
            <Circle cx={120} cy={175} r={3.5} fill={COLORS.neurotransmitters} />
            <Circle cx={140} cy={182} r={3.5} fill={COLORS.neurotransmitters} />
            <Circle cx={160} cy={172} r={3.5} fill={COLORS.neurotransmitters} />
            <Circle cx={175} cy={185} r={3.5} fill={COLORS.neurotransmitters} />
            <Circle cx={195} cy={178} r={3.5} fill={COLORS.neurotransmitters} />
            <Circle cx={210} cy={188} r={3.5} fill={COLORS.neurotransmitters} />
            <Circle cx={150} cy={192} r={3.5} fill={COLORS.neurotransmitters} />
            <Circle cx={185} cy={195} r={3.5} fill={COLORS.neurotransmitters} />
            {/* A few falling from vesicle fusion site */}
            <Circle cx={148} cy={167} r={3} fill={COLORS.neurotransmitters} opacity={0.8} />
            <Circle cx={168} cy={168} r={3} fill={COLORS.neurotransmitters} opacity={0.8} />
          </TouchableOpacity>
        </G>

        {/* ===== RECEPTORS (on postsynaptic membrane) ===== */}
        <G opacity={getOpacity('receptors', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('receptors')}>
            {/* Receptor 1 - Y-shaped / channel */}
            <Path
              d="M 118 210 L 114 198 M 118 210 L 122 198 M 118 210 L 118 220"
              fill="none"
              stroke={COLORS.receptors}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            {/* Receptor 2 */}
            <Path
              d="M 148 210 L 144 198 M 148 210 L 152 198 M 148 210 L 148 220"
              fill="none"
              stroke={COLORS.receptors}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            {/* Receptor 3 */}
            <Path
              d="M 178 210 L 174 198 M 178 210 L 182 198 M 178 210 L 178 220"
              fill="none"
              stroke={COLORS.receptors}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            {/* Receptor 4 */}
            <Path
              d="M 208 210 L 204 198 M 208 210 L 212 198 M 208 210 L 208 220"
              fill="none"
              stroke={COLORS.receptors}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            {/* Receptor 5 */}
            <Path
              d="M 238 210 L 234 198 M 238 210 L 242 198 M 238 210 L 238 220"
              fill="none"
              stroke={COLORS.receptors}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            {/* Bound neurotransmitter on receptor 2 */}
            <Circle cx={148} cy={197} r={3.5} fill={COLORS.neurotransmitters} />
            {/* Bound neurotransmitter on receptor 4 */}
            <Circle cx={208} cy={197} r={3.5} fill={COLORS.neurotransmitters} />
          </TouchableOpacity>
        </G>

        {/* ===== POSTSYNAPTIC MEMBRANE (bottom) ===== */}
        <G opacity={getOpacity('postsynaptic_membrane', highlightedParts)}>
          <TouchableOpacity onPress={() => handlePress('postsynaptic_membrane')}>
            {/* Main membrane band */}
            <Rect
              x={75}
              y={210}
              width={200}
              height={12}
              fill="url(#postsynGrad)"
              rx={2}
            />
            {/* Dendrite body below */}
            <Path
              d="M 75 222 L 75 290 Q 75 310, 175 310 Q 275 310, 275 290 L 275 222 Z"
              fill="#22C55E"
              opacity={0.5}
            />
            {/* Inner structure */}
            <Path
              d="M 90 230 L 90 285 Q 90 300, 175 300 Q 260 300, 260 285 L 260 230 Z"
              fill="#16A34A"
              opacity={0.3}
            />
          </TouchableOpacity>
        </G>

        {/* ===== LABELS ===== */}
        {/* Presynaptic Terminal */}
        <LabelWithLine
          x1={175}
          y1={28}
          x2={20}
          y2={18}
          label="Presynaptic Terminal"
          anchor="start"
          visible={showLabels}
        />

        {/* Mitochondria */}
        <LabelWithLine
          x1={240}
          y1={55}
          x2={290}
          y2={38}
          label="Mitochondria"
          anchor="start"
          visible={showLabels}
        />

        {/* Synaptic Vesicles */}
        <LabelWithLine
          x1={105}
          y1={70}
          x2={15}
          y2={82}
          label="Synaptic Vesicles"
          anchor="start"
          visible={showLabels}
        />

        {/* Calcium Channels */}
        <LabelWithLine
          x1={113}
          y1={155}
          x2={15}
          y2={148}
          label="Ca²⁺ Channels"
          anchor="start"
          visible={showLabels}
        />

        {/* Reuptake Pump */}
        <LabelWithLine
          x1={262}
          y1={156}
          x2={290}
          y2={140}
          label="Reuptake Pump"
          anchor="start"
          visible={showLabels}
        />

        {/* Synaptic Cleft */}
        <LabelWithLine
          x1={175}
          y1={188}
          x2={290}
          y2={188}
          label="Synaptic Cleft"
          anchor="start"
          visible={showLabels}
        />

        {/* Neurotransmitters */}
        <LabelWithLine
          x1={140}
          y1={182}
          x2={15}
          y2={192}
          label="Neurotransmitters"
          anchor="start"
          visible={showLabels}
        />

        {/* Receptors */}
        <LabelWithLine
          x1={238}
          y1={205}
          x2={290}
          y2={220}
          label="Receptors"
          anchor="start"
          visible={showLabels}
        />

        {/* Postsynaptic Membrane */}
        <LabelWithLine
          x1={175}
          y1={216}
          x2={15}
          y2={240}
          label="Postsynaptic Membrane"
          anchor="start"
          visible={showLabels}
        />
      </Svg>
    </View>
  );
};

export default SynapseDiagram;
