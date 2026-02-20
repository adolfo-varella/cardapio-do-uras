import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { useReviews } from "@/hooks/use-reviews";
import { useAuth } from "@/hooks/use-auth";

interface ReviewCardProps {
  productId: string;
  productName: string;
}

export function ReviewCard({ productId, productName }: ReviewCardProps) {
  const { user } = useAuth();
  const { addReview, getProductReviews, getAverageRating, getRatingDistribution } =
    useReviews();

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);
  const distribution = getRatingDistribution(productId);

  const handleSubmitReview = async () => {
    if (selectedRating === 0) {
      alert("Por favor, selecione uma classificação");
      return;
    }

    if (!user?.name) {
      alert("Por favor, faça login para deixar uma avaliação");
      return;
    }

    setIsSubmitting(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      addReview(productId, selectedRating, comment, user.name);
      setSelectedRating(0);
      setComment("");
      alert("Avaliação enviada com sucesso!");
    } catch (error) {
      alert("Erro ao enviar avaliação");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} className="text-lg">
            {star <= rating ? "⭐" : "☆"}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View className="bg-surface rounded-lg p-4 gap-3">
      {/* Header */}
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row justify-between items-center"
      >
        <View>
          <Text className="text-lg font-bold text-foreground">Avaliações</Text>
          <View className="flex-row items-center gap-2 mt-1">
            {renderStars(Math.round(averageRating))}
            <Text className="text-sm text-muted">
              {averageRating.toFixed(1)} ({reviews.length})
            </Text>
          </View>
        </View>
        <Text className="text-2xl">{isExpanded ? "▼" : "▶"}</Text>
      </Pressable>

      {/* Expanded Content */}
      {isExpanded && (
        <ScrollView className="gap-4">
          {/* Rating Distribution */}
          {reviews.length > 0 && (
            <View className="gap-2 bg-background rounded-lg p-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <View key={rating} className="flex-row items-center gap-2">
                  <Text className="text-sm font-semibold w-8">{rating}⭐</Text>
                  <View className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <View
                      className="h-full bg-primary"
                      style={{
                        width: `${
                          reviews.length > 0
                            ? (distribution[rating as keyof typeof distribution] / reviews.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </View>
                  <Text className="text-xs text-muted w-6 text-right">
                    {distribution[rating as keyof typeof distribution]}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Add Review Form */}
          <View className="gap-3 bg-background rounded-lg p-3">
            <Text className="text-sm font-semibold text-foreground">
              Deixe sua avaliação
            </Text>

            {/* Star Rating */}
            <View className="flex-row justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => {
                    setSelectedRating(star);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <Text className="text-3xl">
                    {star <= selectedRating ? "⭐" : "☆"}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Comment Input */}
            <TextInput
              placeholder="Deixe um comentário (opcional)"
              placeholderTextColor="#9BA1A6"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={3}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-foreground text-sm"
            />

            {/* Submit Button */}
            <Pressable
              onPress={handleSubmitReview}
              disabled={isSubmitting || selectedRating === 0}
              className={`rounded-lg py-2 items-center justify-center ${
                selectedRating === 0 ? "bg-muted/50" : "bg-primary"
              }`}
            >
              <Text className="text-white font-semibold text-sm">
                {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
              </Text>
            </Pressable>
          </View>

          {/* Recent Reviews */}
          {reviews.length > 0 && (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                Avaliações Recentes
              </Text>
              {reviews.slice(-3).map((review) => (
                <View
                  key={review.id}
                  className="bg-background rounded-lg p-3 gap-1"
                >
                  <View className="flex-row justify-between items-start">
                    <Text className="text-xs font-semibold text-foreground">
                      {review.userName}
                    </Text>
                    {renderStars(review.rating)}
                  </View>
                  {review.comment && (
                    <Text className="text-xs text-muted">{review.comment}</Text>
                  )}
                  <Text className="text-xs text-muted/50 mt-1">
                    {new Date(review.createdAt).toLocaleDateString("pt-BR")}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
