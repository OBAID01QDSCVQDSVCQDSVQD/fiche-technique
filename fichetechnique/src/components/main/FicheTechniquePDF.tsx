import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import { parseDocument } from 'htmlparser2';
import { Element, DataNode, Node as DomNode, Text as DomText } from 'domhandler';

const sectionColors = [
  {
    labelBg: 'rgb(11, 0, 114)',
    valueBg: 'rgb(210, 210, 210)',
    valueColor: '#222',
  },
  {
    labelBg: '#63c6ff',
    valueBg: '#63c6ff',
    valueColor: '#222',
  },
];

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
    backgroundColor: '#f6f8fa',
    position: 'relative',
  },
  header: {
    backgroundColor: 'rgb(156, 1, 37)',
    color: '#fff',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 16,
  },
  logoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginRight: 24,
    width: 90,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 40,
    objectFit: 'contain',
  },
  headerTextBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: 1,
  },
  shortDesc: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
    opacity: 0.95,
  },
  main: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    paddingTop: 8,
    paddingBottom: 8,
  },
  sectionRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 0,
  },
  label: {
    width: 140,
    minWidth: 100,
    maxWidth: 180,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 8,
    alignItems: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: 1,
    lineHeight: 1.3,
    justifyContent: 'flex-start',
    backgroundColor: '#0a2640',
  },
  value: {
    flex: 1,
    fontSize: 10,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
    minHeight: 40,
    textAlign: 'left',
    lineHeight: 1.5,
    backgroundColor: '#f6f8fa',
    color: '#222',
  },
  footer: {
    fontSize: 8,
    color: '#0a4275',
    borderTopWidth: 1,
    borderTopColor: '#e3f0fa',
    paddingTop: 6,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: '#fff',
    opacity: 0.97,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});

function stripHtml(html: string) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
}

// دالة parsing مخصصة لتحويل HTML إلى عناصر React-PDF
function parseHtmlToPdfElements(html: string) {
  if (!html) return null;
  const dom = parseDocument(html);
  function renderNode(node: DomNode, key?: number): any {
    if (node.type === 'text') {
      return (node as DomText).data;
    }
    if (node.type === 'tag') {
      const el = node as Element;
      const children = el.children?.map((child, idx) => renderNode(child, idx));
      switch (el.name) {
        case 'b':
        case 'strong':
          return <Text key={key} style={{ fontWeight: 'bold' }}>{children}</Text>;
        case 'i':
        case 'em':
          return <Text key={key} style={{ fontStyle: 'italic' }}>{children}</Text>;
        case 'u':
          return <Text key={key} style={{ textDecoration: 'underline' }}>{children}</Text>;
        case 'span': {
          let style: any = {};
          if (el.attribs && el.attribs.style) {
            const colorMatch = el.attribs.style.match(/color:([^;]+)/);
            if (colorMatch && colorMatch[1].trim() && isValidHexColor(colorMatch[1].trim())) {
              style.color = colorMatch[1].trim();
            }
            const bgMatch = el.attribs.style.match(/background-color:([^;]+)/);
            if (bgMatch && bgMatch[1].trim() && isValidHexColor(bgMatch[1].trim())) {
              style.backgroundColor = bgMatch[1].trim();
            }
          }
          return <Text key={key} style={Object.keys(style).length ? style : {}}>{children}</Text>;
        }
        case 'a':
          return <Text key={key} style={{ color: '#2980ef', textDecoration: 'underline' }}>{children}</Text>;
        case 'br':
          return '\n';
        case 'ul':
        case 'ol':
          return <View key={key} style={{ marginLeft: 12 }}>{children}</View>;
        case 'li':
          return <View key={key} style={{ flexDirection: 'row' }}><Text>• </Text><Text>{children}</Text></View>;
        case 'img':
          if (el.attribs && el.attribs.src) {
            return <Image key={key} src={el.attribs.src} style={{ width: 80, height: 60, margin: 4 }} />;
          }
          return null;
        case 'h1':
          return <Text key={key} style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 6 }}>{children}</Text>;
        case 'h2':
          return <Text key={key} style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{children}</Text>;
        case 'h3':
          return <Text key={key} style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{children}</Text>;
        case 'blockquote':
          return <Text key={key} style={{ fontStyle: 'italic', color: '#888', borderLeft: '2px solid #ccc', paddingLeft: 8 }}>{children}</Text>;
        case 'code':
          return <Text key={key} style={{ fontFamily: 'monospace', backgroundColor: '#eee', padding: 2 }}>{children}</Text>;
        case 'table':
          return <View key={key} style={{ width: 'auto', marginVertical: 8 }}>{children}</View>;
        case 'tr':
          return <View key={key} style={{ flexDirection: 'row' }}>{children}</View>;
        case 'th':
          return <View key={key} style={{ border: '1px solid #ccc', padding: 4 }}><Text style={{ fontWeight: 'bold' }}>{children}</Text></View>;
        case 'td':
          return <View key={key} style={{ border: '1px solid #ccc', padding: 4 }}><Text>{children}</Text></View>;
        case 'p':
          return <View key={key} style={{ marginBottom: 6 }}><Text>{children}</Text></View>;
        default:
          return <Text key={key}>{children}</Text>;
      }
    }
    return null;
  }
  return dom.children.map((node, idx) => renderNode(node, idx)).filter(Boolean);
}

// دالة للتحقق من صحة اللون hex
function isValidHexColor(color: string) {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color.trim());
}

const FicheTechniquePDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      {/* Header */}
      <View style={styles.header} fixed>
        <View style={styles.logoBox}>
          <Image src="/log%20HC.png" style={styles.logo} />
        </View>
        <View style={styles.headerTextBox}>
          <Text style={styles.productName}>{data.nom}</Text>
          {data.shortdesc && <Text style={styles.shortDesc}>{data.shortdesc}</Text>}
        </View>
      </View>
      {/* Sections */}
      <View style={styles.main}>
        {[
          { label: 'INFORMATION', value: data.description },
          { label: "DOMAINES D'APPLICATIONS", value: data.domaine },
          { label: 'CARACTÉRISTIQUES AVANTAGES', value: data.proprietes },
          { label: 'PRÉPARATION DU SUPPORT', value: data.preparation },
          { label: "CONDITIONS D'APPLICATION", value: data.conditions },
          { label: 'APPLICATION', value: data.application },
          { label: 'CONSOMMATION', value: data.consommation },
          { label: 'NETTOYAGE', value: data.nettoyage },
          { label: 'STOCKAGE ET CONDITIONNEMENT', value: data.stockage },
          { label: 'CONSIGNES DE SÉCURITÉ', value: data.consignes },
        ]
          .filter(section => section.value && section.value.trim() !== '')
          .map((section, idx, arr) => {
            const colorIdx = idx % 2;
            const { labelBg, valueBg, valueColor } = sectionColors[colorIdx];
            return (
              <View
                style={{ ...styles.sectionRow, borderBottomWidth: idx < arr.length - 1 ? 1 : 0 }}
                key={idx}
                wrap={false}
              >
                <Text style={{ ...styles.label, backgroundColor: labelBg }}>{section.label}</Text>
                <View style={{ ...styles.value, backgroundColor: valueBg, color: valueColor }}>
                  {parseHtmlToPdfElements(String(section.value || ''))}
                </View>
              </View>
            );
          })}
      </View>
      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text style={{ textAlign: 'center', marginRight: 8, flex: 1 }}>www.horizon-chimique.tn</Text>
        <Text style={{ textAlign: 'center', marginRight: 8, flex: 1 }}>31 520 033</Text>
        <Text style={{ textAlign: 'center', marginRight: 8, flex: 2 }}>ZI Sidi Abdelhamid, Sousse, Tunisie</Text>
        <Text style={{ textAlign: 'center', minWidth: 60, flex: 1 }} render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />
      </View>
    </Page>
  </Document>
);

export default FicheTechniquePDF;
