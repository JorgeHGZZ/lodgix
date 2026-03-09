import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import styles from "../../styles/BarChart.module.css"



interface BarChartProps {
    data?: { name: string; ventas: number }[];
}
const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6","#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6","#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const BarChartComponent = ({ data }: BarChartProps) => {
    return (
        <div className={styles.BarChar}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3b568d" />
                    <XAxis dataKey="name" stroke="#716c50" />
                    <YAxis stroke="#002877" />
                    <Tooltip />
                    <Bar dataKey="ventas">
                        {colors.map((color, index) => (
                            <Cell key={index} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;